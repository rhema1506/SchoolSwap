from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import register_view, me_view
from chat import views as chat_views
from .views import my_profile, public_profile

urlpatterns = [
    path("register/", register_view, name="register"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/chat/create/", chat_views.create_chat),
    path("api/chat/<int:chat_id>/", chat_views.get_chat),
    path("me/", me_view, name="me"),
       path("me/", my_profile),
    path("<str:username>/", public_profile),
]
