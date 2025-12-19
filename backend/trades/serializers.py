from rest_framework import serializers
from .models import TradeRequest
from apps.products.serializers import ProductSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class TradeRequestCreateSerializer(serializers.ModelSerializer):
    # requester is set automatically
    offered_product_id = serializers.IntegerField(required=False, allow_null=True, write_only=True)

    class Meta:
        model = TradeRequest
        fields = ["id", "requested_product", "offered_product_id", "message"]

    def validate(self, attrs):
        user = self.context['request'].user
        requested_product = attrs.get("requested_product")
        offered_product_id = attrs.get("offered_product_id", None)
        # Can't request own product
        if requested_product.seller_id == user.id:
            raise serializers.ValidationError("Cannot request your own product.")
        # if offered_product_id provided, ensure it belongs to requester
        if offered_product_id:
            try:
                from apps.products.models import Product
                op = Product.objects.get(pk=offered_product_id)
            except Product.DoesNotExist:
                raise serializers.ValidationError("Offered product not found.")
            if op.seller_id != user.id:
                raise serializers.ValidationError("You can only offer your own product.")
            attrs["offered_product"] = op
        else:
            attrs["offered_product"] = None
        return attrs

    def create(self, validated_data):
        requester = self.context['request'].user
        requested_product = validated_data.pop("requested_product")
        offered_product = validated_data.pop("offered_product", None)
        message = validated_data.get("message", "")
        trade = TradeRequest.objects.create(
            requester=requester,
            responder=requested_product.seller,
            requested_product=requested_product,
            offered_product=offered_product,
            message=message,
            status=TradeRequest.STATUS_PENDING
        )
        return trade

class TradeRequestSerializer(serializers.ModelSerializer):
    requester = serializers.StringRelatedField(read_only=True)
    responder = serializers.StringRelatedField(read_only=True)
    requested_product = ProductSerializer(read_only=True)
    offered_product = ProductSerializer(read_only=True)

    class Meta:
        model = TradeRequest
        fields = ["id", "requester", "responder", "requested_product", "offered_product", "message", "status", "created_at", "updated_at"]
