from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models import Q
from core.models import Product,Category,Subcategory
from .serializer import ProductSerializer, CategoryWithSubcategoriesSerializer, OrderSerializer
from django.core.mail import send_mail
import json
from rest_framework.parsers import JSONParser
from django.conf import settings


from .serializer import ProductSerializer, CategoryWithSubcategoriesSerializer
from django.core.mail import send_mail
import logging

logger = logging.getLogger(__name__)


@api_view(['GET'])
def SendMail(request):
    email = request.query_params.get('email')
    order_id = request.query_params.get('order_id')
    if not email or not order_id:
        return Response('Missing email or order_id parameter', status=400)
    
    subject = 'Webshop Order'
    message = "Your ID: "+order_id+ ". Your payment has been successfully completed!!"
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    
    send_mail(subject, message, email_from, recipient_list)
    
    return Response('Email sent successfully')

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



@api_view(['POST'])
def create_order(request):
    try:
        data = JSONParser().parse(request)
        mapped_data = {
            "email": data["email"],
            "total_amount": data["totalPrice"],
            "address": data["address"],
            "description": data.get("description", ""),
            "user_fname": data["firstName"],
            "user_lname": data["lastName"],
            "items": [
                {
                    "product_name": item["name"],
                    "product_id": str(item["id"]),
                    "quantity": item["quantity"],
                    "price": item["price"]
                }
                for item in data["orderedItem"]
            ],
            "payment": {
                "stripe_payment_id": data["paymentId"],
                "amount": data["totalPrice"],
                "status": "Done",
                "success": True  # Assuming success is True for this example
            }
        }

        serializer = OrderSerializer(data=mapped_data)
        if serializer.is_valid():
            order = serializer.save()

            response_data = {
                "order_id":serializer.data["order_id"],
                "response_data":serializer.data,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", json.dumps(serializer.errors, indent=4))
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print("Exception:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)