from rest_framework import serializers

from core.models import Product,Category, Subcategory

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id', 'name',
            'picture1', 'picture2', 'picture3',
            'description','price',
            'quantity', 'rating',
            'created_at','updated_at',
            'category', 'subcategory'
        ]#'__all__'

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ['id', 'name'] #'__all__'

class CategoryWithSubcategoriesSerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['id', 'name'] #'__all__'