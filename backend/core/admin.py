from django import forms
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from .models import Product, Category, Subcategory, OrderItem, Order


class ProductAdminForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'

    # initialization

    def __init__(self, *args, **kwargs):
        super(ProductAdminForm, self).__init__(*args, **kwargs)
        if 'instance' in kwargs and kwargs['instance']:
            self.fields['subcategory'].queryset = Subcategory.objects.filter(
                category=kwargs['instance'].category)
        elif 'category' in self.data:
            self.fields['subcategory'].queryset = Subcategory.objects.filter(
                category_id=self.data.get('category'))
        else:
            self.fields['subcategory'].queryset = Subcategory.objects.none()


class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm

    class Media:
        js = ('core/js/custom.js',)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('subcategory_by_category/<int:category_id>/', self.admin_site.admin_view(
                self.subcategories_by_category), name='subcategory_by_category'),
        ]
        return custom_urls + urls

    def subcategories_by_category(self, request, category_id):
        subcategories = Subcategory.objects.filter(
            category_id=category_id).values('id', 'name')
        return JsonResponse({'subcategories': list(subcategories)})
    

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemInline]


admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)
