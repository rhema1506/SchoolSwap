from django.urls import path
from .views import UploadFileView
from .views import last_seen

urlpatterns = [
    path("upload/", UploadFileView.as_view(), name="chat-upload"),
    # other chat REST endpoints...
    path("last-seen/<int:user_id>/", last_seen),
]
