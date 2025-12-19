from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from django.utils.timezone import now, timedelta

from products.models import Product
from chat.models import Chat, Message

User = get_user_model()

@api_view(["GET"])
@permission_classes([IsAdminUser])
def dashboard_stats(request):
    total_users = User.objects.count()
    total_products = Product.objects.count()
    total_chats = Chat.objects.count()
    total_messages = Message.objects.count()

    last_7_days = []
    for i in range(7):
        day = now().date() - timedelta(days=i)
        count = User.objects.filter(date_joined__date=day).count()
        last_7_days.append({
            "date": day.strftime("%Y-%m-%d"),
            "users": count
        })

    return Response({
        "total_users": total_users,
        "total_products": total_products,
        "total_chats": total_chats,
        "total_messages": total_messages,
        "users_last_7_days": list(reversed(last_7_days))
    })
@api_view(["GET"])
@permission_classes([IsAdminUser])
def users_list(request):
    users = User.objects.all().values(
        "id", "username", "email", "is_active", "is_staff"
    )
    return Response(users)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def toggle_user_block(request, user_id):
    user = User.objects.get(id=user_id)
    user.is_active = not user.is_active
    user.save()
    return Response({
        "id": user.id,
        "is_active": user.is_active
    })
