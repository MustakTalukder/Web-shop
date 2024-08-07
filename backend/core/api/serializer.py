from rest_framework import serializers
from payments.api.serializer import PaymentSerializer

from core.models import Product,Category, Subcategory, Order, OrderItem
from payments.models import Payment

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = '__all__'

class CategoryWithSubcategoriesSerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product_name', 'product_id', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    payment = PaymentSerializer()

    class Meta:
        model = Order
        fields = ['email', 'total_amount', 'address', 'description', 'user_fname', 
                  'user_lname', 'items', 'payment']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        payment_data = validated_data.pop('payment')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        Payment.objects.create(**payment_data)
        return order