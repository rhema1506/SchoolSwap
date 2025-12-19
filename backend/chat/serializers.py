from rest_framework import serializers
from .models import Message, Chat

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField(read_only=True)
    image = serializers.ImageField(read_only=True)

    class Meta:
        model = Message
        fields = ['id','chat','sender','content','image','created_at','read']

class ChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    class Meta:
        model = Chat
        fields = ['id','messages','created_at']
