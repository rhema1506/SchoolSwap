from django.utils import timezone
from django.core.cache import cache

ONLINE_USERS_KEY = "online_users"

def set_user_online(user_id):
    cache.hset(ONLINE_USERS_KEY, user_id, timezone.now().isoformat())

def set_user_offline(user_id):
    cache.hdel(ONLINE_USERS_KEY, user_id)

def get_online_users():
    return cache.hkeys(ONLINE_USERS_KEY)

def get_last_seen(user_id):
    return cache.hget(ONLINE_USERS_KEY, user_id)
