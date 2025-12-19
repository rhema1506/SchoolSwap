from rest_framework import generics, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from .models import TradeRequest
from .serializers import TradeRequestCreateSerializer, TradeRequestSerializer
from django.shortcuts import get_object_or_404
from apps.chat.models import Chat  # adjust if chat model in apps.chat
from django.db import transaction

class TradeCreateView(generics.CreateAPIView):
    queryset = TradeRequest.objects.all()
    serializer_class = TradeRequestCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx.update({"request": self.request})
        return ctx

class TradeListView(generics.ListAPIView):
    serializer_class = TradeRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # allow filtering inbox/outbox via ?box=inbox|outbox
        user = self.request.user
        box = self.request.query_params.get("box")
        if box == "inbox":
            return TradeRequest.objects.filter(responder=user).order_by("-created_at")
        if box == "outbox":
            return TradeRequest.objects.filter(requester=user).order_by("-created_at")
        return TradeRequest.objects.filter(models.Q(responder=user) | models.Q(requester=user)).order_by("-created_at")

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def accept_trade(request, pk):
    trade = get_object_or_404(TradeRequest, pk=pk)
    user = request.user
    if trade.responder_id != user.id:
        return Response({"detail": "Only the responder can accept."}, status=status.HTTP_403_FORBIDDEN)
    if trade.status != TradeRequest.STATUS_PENDING:
        return Response({"detail": "Trade not pending."}, status=status.HTTP_400_BAD_REQUEST)

    # perform acceptance: optionally swap ownerships or mark completed
    with transaction.atomic():
        trade.accept()
        # example: swap product ownership if offered_product provided
        if trade.offered_product:
            p_req = trade.requested_product
            p_off = trade.offered_product
            # swap sellers
            owner_req = p_req.seller
            owner_off = p_off.seller
            p_req.seller = owner_off
            p_off.seller = owner_req
            p_req.save()
            p_off.save()
        # ensure chat exists between users and return chat id
        chat = Chat.objects.filter(participants=trade.requester).filter(participants=trade.responder).first()
        if not chat:
            chat = Chat.objects.create()
            chat.participants.add(trade.requester, trade.responder)
    serializer = TradeRequestSerializer(trade)
    return Response({"trade": serializer.data, "chat_id": chat.id})

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def reject_trade(request, pk):
    trade = get_object_or_404(TradeRequest, pk=pk)
    user = request.user
    if trade.responder_id != user.id:
        return Response({"detail": "Only the responder can reject."}, status=status.HTTP_403_FORBIDDEN)
    if trade.status != TradeRequest.STATUS_PENDING:
        return Response({"detail": "Trade not pending."}, status=status.HTTP_400_BAD_REQUEST)
    trade.reject()
    return Response({"detail": "Rejected"}, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def cancel_trade(request, pk):
    trade = get_object_or_404(TradeRequest, pk=pk)
    user = request.user
    if trade.requester_id != user.id:
        return Response({"detail": "Only the requester can cancel."}, status=status.HTTP_403_FORBIDDEN)
    if trade.status != TradeRequest.STATUS_PENDING:
        return Response({"detail": "Trade not pending."}, status=status.HTTP_400_BAD_REQUEST)
    trade.cancel()
    return Response({"detail": "Cancelled"}, status=status.HTTP_200_OK)
