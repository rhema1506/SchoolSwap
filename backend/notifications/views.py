from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_notifications(request):
    qs = Notification.objects.filter(user=request.user).order_by("-created_at")
    return Response(NotificationSerializer(qs, many=True).data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_notifications(request):
    notifications = Notification.objects.filter(user=request.user).order_by("-created_at")
    return Response([
        {
            "id": n.id,
            "type": n.type,
            "title": n.title,
            "body": n.body,
            "is_read": n.is_read,
            "created_at": n.created_at
        }
        for n in notifications
    ])

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def mark_read(request, pk):
    notification = Notification.objects.get(pk=pk, user=request.user)
    notification.is_read = True
    notification.save()
    return Response({"status": "ok"})