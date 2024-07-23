from django.db import models

# Create your models here.


class Category(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True,
                            null=False, blank=False)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Subcategory(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True,
                            null=False, blank=False)
    category = models.ForeignKey(
        Category, related_name='subcategories', on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    category = models.ForeignKey(
        Category, related_name='products', on_delete=models.CASCADE)
    subcategory = models.ForeignKey(
        Subcategory, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=False, blank=False)
    picture1 = models.ImageField(upload_to='products/', null=True, blank=True)
    picture2 = models.ImageField(upload_to='products/', null=True, blank=True)
    picture3 = models.ImageField(upload_to='products/', null=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    rating = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
