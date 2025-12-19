from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.conf import settings
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from chat.presence import get_last_seen

class UploadFileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        """
        Accepts 'file' in form-data, saves it to MEDIA, returns file URL.
        """
        file = request.FILES.get('file')
        if not file:
            return Response({"detail":"No file provided"}, status=400)
        # Let Django storage handle save path
        path = default_storage.save(os.path.join('uploads', file.name), file)
        url = request.build_absolute_uri(settings.MEDIA_URL + path)
        return Response({"url": url}, status=201)
    
    @api_view(["GET"])
    def last_seen(request, user_id):
     last = get_last_seen(user_id)
     return Response({
        "user_id": user_id,
        "last_seen": last
    })