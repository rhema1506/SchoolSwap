from django.urls import path
from .views import TradeCreateView, TradeListView, accept_trade, reject_trade, cancel_trade

urlpatterns = [
    path("", TradeCreateView.as_view(), name="trade-create"),
    
    path("list/", TradeListView.as_view(), name="trade-list"),
    path("<int:pk>/accept/", accept_trade, name="trade-accept"),
    path("<int:pk>/reject/", reject_trade, name="trade-reject"),
    path("<int:pk>/cancel/", cancel_trade, name="trade-cancel"),
]
