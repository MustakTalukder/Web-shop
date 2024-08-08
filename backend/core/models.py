from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from model_utils import FieldTracker
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO

#from payments.models import PaymentTable as Payment

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
    picture1 = models.ImageField(upload_to='products/', null=True, blank=True, default='products/default-img.png')
    picture2 = models.ImageField(upload_to='products/', null=True, blank=True, default='products/default-img.png')
    picture3 = models.ImageField(upload_to='products/', null=True, blank=True, default='products/default-img.png')
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    rating = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    id = models.BigAutoField(primary_key=True)
    user_fname = models.CharField(max_length=20, null=True, blank=True)
    user_lname = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(max_length=254)
    order_id = models.CharField(max_length=100, unique=True, editable=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_intent_id = models.CharField(max_length=200, blank=True, null=True)
    invoice_pdf = models.BinaryField(blank=True, null=True)
    address = models.TextField(blank=True)
    description = models.TextField(null=True, blank=True)

    tracker = FieldTracker(fields=['status'])

    def save(self, *args, **kwargs):
        if not self.order_id:
            self.order_id = self.generate_order_id()
        if self.tracker.has_changed('status') and self.status == 'completed':
            self.generate_invoice_pdf()
        super().save(*args, **kwargs)

    def generate_order_id(self):
        return f'ORD-{timezone.now().strftime("%Y%m%d%H%M%S")}'

    def generate_invoice_pdf(self):
        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        p.drawString(100, 750, f"Order ID: {self.order_id}")
        p.drawString(100, 730, f"Email: {self.email}")
        p.drawString(100, 710, f"Total Amount: ${self.total_amount}")
        p.drawString(100, 690, f"Status: {self.status}")
        p.showPage()
        p.save()
        
        self.invoice_pdf = buffer.getvalue()
        buffer.close()

    def __str__(self):
        return self.order_id

    
    

class OrderItem(models.Model):
    id = models.BigAutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product_name = models.CharField(max_length=200)
    product_id = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.quantity} x {self.product_name}'


