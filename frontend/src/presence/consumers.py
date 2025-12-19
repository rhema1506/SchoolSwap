import json
from channels.generic.websocket import AsyncWebsocketConsumer
from presence.utils import set_user_online, set_user_offline

class PresenceConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope["user"]
        if not user.is_authenticated:
            return await self.close()

        set_user_online(user.id)
        await self.accept()

        # Broadcast user online
        await self.channel_layer.group_send(
            "presence",
            {
                "type": "user_status",
                "user_id": user.id,
                "online": True
            }
        )

        await self.channel_layer.group_add("presence", self.channel_name)

    async def disconnect(self, close_code):
        user = self.scope["user"]
        if user.is_authenticated:
            set_user_offline(user.id)

            await self.channel_layer.group_send(
                "presence",
                {
                    "type": "user_status",
                    "user_id": user.id,
                    "online": False
                }
            )
               
