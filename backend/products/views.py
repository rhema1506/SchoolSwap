from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product, ProductImage
from .serializers import ProductSerializer, ProductImageSerializer
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.order_by('-created_at').all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        product = serializer.save(seller=self.request.user)
        # images uploaded via separate endpoint; if you send images as multipart fields, handle here if needed

class ProductImageUploadView(APIView):
    """
    Upload one or multiple images for a product.
    Expects multipart/form-data with 'images' multiple files and 'product' id.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        product_id = request.data.get('product')
        if not product_id:
            return Response({"detail": "product is required"}, status=status.HTTP_400_BAD_REQUEST)
        product = get_object_or_404(Product, pk=product_id)
        # only seller or admin can upload images for product
        if product.seller_id != request.user.id and not request.user.is_staff:
            return Response({"detail": "Not allowed"}, status=status.HTTP_403_FORBIDDEN)
        files = request.FILES.getlist('images')
        created = []
        for f in files:
            pi = ProductImage.objects.create(product=product, image=f)
            created.append(ProductImageSerializer(pi, context={'request': request}).data)
        return Response(created, status=status.HTTP_201_CREATED)

@api_view(["GET"])
def product_list(request):
    qs = Product.objects.all().order_by("-created_at")

    keyword = request.GET.get("q")
    category = request.GET.get("category")
    min_price = request.GET.get("min_price")
    max_price = request.GET.get("max_price")
    sort = request.GET.get("sort")

    if keyword:
        qs = qs.filter(
            Q(title__icontains=keyword) |
            Q(description__icontains=keyword)
        )

    if category:
        qs = qs.filter(category__id=category)

    if min_price:
        qs = qs.filter(price__gte=min_price)

    if max_price:
        qs = qs.filter(price__lte=max_price)

    if sort == "price_asc":
        qs = qs.order_by("price")
    elif sort == "price_desc":
        qs = qs.order_by("-price")

    serializer = ProductSerializer(qs, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def category_list(request):
    categories = Category.objects.all()
    return Response(CategorySerializer(categories, many=True).data)