from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models import Q
from core.models import Product,Category,Subcategory
from .serializer import ProductSerializer, CategoryWithSubcategoriesSerializer, OrderSerializer

import json
from rest_framework.parsers import JSONParser

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
    categories = request.GET.get('category', '').split(',')  # Split category by comma
    min_price = request.GET.get('min_price', '')
    max_price = request.GET.get('max_price', '')

    filters = Q()
    if query:
        filters &= Q(name__icontains=query) | Q(description__icontains=query)
    if categories and categories[0]:  # Ensure categories list is not empty
        filters &= Q(category__name__in=categories) | Q(subcategory__name__in=categories)
    if min_price:
        filters &= Q(price__gte=min_price)
    if max_price:
        filters &= Q(price__lte=max_price)

    products = Product.objects.filter(filters).distinct()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def ShowAllCategoriesAndSubcategories(request):
    categories = Category.objects.prefetch_related('subcategories').all()
    serializer = CategoryWithSubcategoriesSerializer(categories, many=True)
    return Response(serializer.data)


'''
@api_view(['POST'])
def create_order(request):
    print('*'*10)
    print("Request data:", request.data)
    print('*'*10) 

    if request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
'''

@api_view(['POST'])
def create_order(request):
    try:
        data = JSONParser().parse(request)
        print('*' * 10)
        print("Request data:", json.dumps(data, indent=4))
        print('*' * 10)

        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", json.dumps(serializer.errors, indent=4))
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print("Exception:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)