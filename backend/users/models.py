from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    school = models.CharField(max_length=255, blank=True)
    user_class = models.CharField(max_length=50, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    rating = models.FloatField(default=0)
    completed_trades = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.user.username
