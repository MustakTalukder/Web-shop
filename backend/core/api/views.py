from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models import Q
from core.models import Product,Category,Subcategory
from .serializer import ProductSerializer, CategoryWithSubcategoriesSerializer, OrderSerializer

import json
from rest_framework.parsers import JSONParser



from .serializer import ProductSerializer, CategoryWithSubcategoriesSerializer
from django.core.mail import send_mail
import requests
import logging

logger = logging.getLogger(__name__)


@api_view(['GET'])
def SendMail(request):
    try:
        mailgun_response = requests.post(
            "https://api.mailgun.net/v3/sandboxd2fabadd0a564567a636b5f6d8f04a52.mailgun.org/messages",
            auth=("api", "de788b2cac0b793e6bdaecf9ab0ecfa5-a26b1841-af21c416"),
            data={
                "from": "Excited User <mailgun@sandboxd2fabadd0a564567a636b5f6d8f04a52.mailgun.org>",
                "to": ["mustak.prodev@gmail.com"],
                "subject": "Hello WEBSHOP",
                "text": "Testing some Mailgun awesomeness!"
            }
        )

        if mailgun_response.status_code == 200:
            logger.info("Email sent successfully!")
            return Response({"message": "Email sent successfully!"}, status=200)
        else:
            logger.error(f"Failed to send email: {mailgun_response.json()}")
            return Response({"error": "Failed to send email", "details": mailgun_response.json()}, status=mailgun_response.status_code)
    except Exception as e:
        logger.exception("An error occurred while sending email")
        return Response({"error": "An error occurred while sending email", "details": str(e)}, status=500)


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