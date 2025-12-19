import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope["user"]
        if user.is_anonymous:
            await self.close()
            return

        self.group_name = f"notifications_{user.id}"

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def send_notification(self, event):
        await self.send(text_data=json.dumps(event["data"]))
        
channel_layer = get_channel_layer()

async_to_sync(channel_layer.group_send)(
    f"notifications_{receiver.id}",
    {
        "type": "notify",
        "data": {
            "type": "message",
            "chat_id": chat.id,
            "text": "Новое сообщение",
        }
    }
)