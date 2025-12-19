from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Chat, Message
import json
from notifications.models import Notification

class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs'].get('chat_id')
        self.group_name = f"chat_{self.chat_id}"
        user = self.scope.get('user')
        if user is None or not user.is_authenticated:
            await self.close()
            return
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        if self.user_id:
            set_user_offline(self.user_id)

        await self.channel_layer.group_discard(self.room, self.channel_name)

        await self.channel_layer.group_send(
            self.room,
            {
                "type": "presence_update",
                "user_id": self.user_id,
                "status": "offline",
            },
        )

    async def presence_update(self, event):
        await self.send(text_data=json.dumps({
            "type": "presence",
            "user_id": event["user_id"],
            "status": event["status"]
        }))

    async def receive_json(self, content, **kwargs):
        """
        Expect either:
        { "type": "message", "content": "text" }
        or
        { "type": "message", "image": "https://.../media/uploads/..." }
        or both
        """
        user = self.scope.get('user')
        if not user or not user.is_authenticated:
            await self.send_json({"error":"not authenticated"})
            return

        if content.get("type") != "message":
            return

        text = content.get("content", "")
        image_url = content.get("image")  # frontend should upload file via REST and send the image URL here

        message_obj = await self.create_message(user, text, image_url)
        data = {
            "type": "chat.message",
            "id": message_obj.id,
            "chat_id": self.chat_id,
            "sender_id": user.id,
            "sender_username": user.username,
            "content": message_obj.content,
            "image": message_obj.image.url if message_obj.image else None,
            "created_at": message_obj.created_at.isoformat(),
        }
        await self.channel_layer.group_send(self.group_name, {"type":"chat.message","message":data})

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "type": "message",
            "message": event["message"],
            "sender": event["sender"]
         }))

    async def typing(self, event):
        await self.send(text_data=json.dumps({
            "type": "typing",
            "user": event["user"]
        }))

    @database_sync_to_async
    def create_message(self, user, text, image_url):
        # If image_url is provided and is a path inside MEDIA_ROOT we can convert to ImageField
        # Simpler: if image_url is provided as absolute URL pointing to MEDIA, we will create Message with image path removed.
        msg = Message.objects.create(chat_id=self.chat_id, sender=user, content=text)
        if image_url:
            # Try to convert image_url -> relative path stored by ImageField. If you used UploadFileView it returns absolute URL built from MEDIA_URL + path.
            # E.g. http://127.0.0.1:8000/media/uploads/filename.jpg -> we need 'uploads/filename.jpg'
            from django.conf import settings
            if settings.MEDIA_URL and image_url.startswith(request_build_base_url := ""):
                pass
            # Simpler approach: do not re-save via ImageField here — just leave image empty.
            # Alternatively, you can create Message.image by downloading the file or by storing path in a text field.
            # For good behavior, we will assume uploaded file was stored by UploadFileView and we can set image field with relative path:
            try:
                from urllib.parse import urlparse
                parsed = urlparse(image_url)
                rel_path = parsed.path.replace(settings.MEDIA_URL, "").lstrip("/")
                msg.image = rel_path  # set to relative path; Django will accept this for ImageField
                msg.save()
            except Exception:
                # ignore setting image if conversion fails
                pass
        return msg
 # после сохранения сообщения:
Notification.objects.create(
    user=receiver,
    sender=sender,
    type="message",
    chat_id=chat.id,
    text="Новое сообщение"
)