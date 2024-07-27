from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Q
from core.models import Product
from .serializer import ProductSerializer

@api_view(['GET'])
def ShowAll(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def ViewProduct(request, pk):
    product = get_object_or_404(Product, id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def CreateProduct(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def updateProduct(request, pk):
    product = get_object_or_404(Product, id=pk)
    serializer = ProductSerializer(instance=product, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteProduct(request, pk):
    product = get_object_or_404(Product, id=pk)
    product.delete()
    return Response('Item deleted successfully!')

@api_view(['GET'])
def SearchProduct(request):
    query = request.GET.get('search', '')
    category = request.GET.get('category', '')
    min_price = request.GET.get('min_price', '')
    max_price = request.GET.get('max_price', '')

    filters = Q()
    if query:
        filters &= Q(name__icontains=query) | Q(description__icontains=query)
    if category:
        filters &= Q(category__name__icontains=category) | Q(subcategory__name__icontains=category)
    if min_price:
        filters &= Q(price__gte=min_price)
    if max_price:
        filters &= Q(price__lte=max_price)

    products = Product.objects.filter(filters)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
