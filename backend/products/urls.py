from django.urls import path
from .views import ProductListCreateView, ProductRetrieveView
from .views import product_list, category_list

urlpatterns = [
    path("", ProductListCreateView.as_view(), name="product-list"),
    path("<int:pk>/", ProductRetrieveView.as_view(), name="product-detail"),
      path("", product_list),
    path("categories/", category_list),
]
