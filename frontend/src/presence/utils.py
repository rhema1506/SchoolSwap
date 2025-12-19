from django.utils import timezone
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import redis
import json

redis_client = redis.Redis(host='127.0.0.1', port=6379, db=5)

def set_user_online(user_id):
    redis_client.set(f"user:{user_id}:online", "1")
    redis_client.set(f"user:{user_id}:last_seen", timezone.now().isoformat())

def set_user_offline(user_id):
    redis_client.set(f"user:{user_id}:online", "0")
    redis_client.set(f"user:{user_id}:last_seen", timezone.now().isoformat())

def is_user_online(user_id):
    return redis_client.get(f"user:{user_id}:online") == b"1"

def get_last_seen(user_id):
    ts = redis_client.get(f"user:{user_id}:last_seen")
    return ts.decode("utf-8") if ts else None
