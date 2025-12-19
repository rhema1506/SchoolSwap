from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static

def api_test(request):
    return JsonResponse({"status": "API running"})

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/test/", api_test),
      path("api/", include("core.urls")),
    path("api/auth/", include("users.urls")),
    path("api/products/", include("products.urls")),
    path("api/trades/", include("trades.urls")),
    path("api/chat/", include("chat.urls")), 
    path("api/uploads/", include("uploads.urls")),
    path("api/notifications/", include("notifications.urls")),
    path("api/products/", include("products.urls")),
    path("api/profile/", include("users.urls")),
    path("api/admin/", include("adminpanel.urls")),



]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)