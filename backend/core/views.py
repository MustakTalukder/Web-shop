from django.shortcuts import get_object_or_404

@api_view(['GET'])
def ShowAllCategoriesAndSubcategories(request):
    # categories = Category.objects.all()
    # serializer = CategoryWithSubcategoriesSerializer(categories, many=True)
    # return Response(serializer.data)
    categories = Category.objects.prefetch_related('subcategories').all()
    serializer = CategoryWithSubcategoriesSerializer(categories, many=True)
    return Response(serializer.data)