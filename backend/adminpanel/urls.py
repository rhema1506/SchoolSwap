from django.urls import path
from .views import dashboard_stats, users_list, toggle_user_block

urlpatterns = [
    path("stats/", dashboard_stats),
    path("users/", users_list),
    path("users/<int:user_id>/toggle/", toggle_user_block),
]
