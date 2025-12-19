from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import Notification

def send_notification(user, type, title, body=""):
    notification = Notification.objects.create(
        user=user,
        type=type,
        title=title,
        body=body,
    )

    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
        f"notifications_{user.id}",
        {
            "type": "send_notification",
            "data": {
                "id": notification.id,
                "type": notification.type,
                "title": notification.title,
                "body": notification.body,
                "created_at": notification.created_at.isoformat(),
            }
        }
    )
