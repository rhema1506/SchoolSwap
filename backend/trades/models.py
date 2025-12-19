from django.db import models
from django.conf import settings
from apps.products.models import Product

User = settings.AUTH_USER_MODEL

class TradeRequest(models.Model):
    STATUS_PENDING = "pending"
    STATUS_ACCEPTED = "accepted"
    STATUS_REJECTED = "rejected"
    STATUS_CANCELLED = "cancelled"
    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_ACCEPTED, "Accepted"),
        (STATUS_REJECTED, "Rejected"),
        (STATUS_CANCELLED, "Cancelled"),
    ]

    requester = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sent_trades")
    responder = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="received_trades")

    requested_product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="trade_requests_received")
    offered_product = models.ForeignKey(Product, on_delete=models.SET_NULL, related_name="trade_offers_sent", null=True, blank=True)

    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_PENDING)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def accept(self):
        self.status = self.STATUS_ACCEPTED
        self.save()

    def reject(self):
        self.status = self.STATUS_REJECTED
        self.save()

    def cancel(self):
        self.status = self.STATUS_CANCELLED
        self.save()

    def __str__(self):
        return f"Trade {self.pk} {self.requester} -> {self.responder} ({self.status})"
