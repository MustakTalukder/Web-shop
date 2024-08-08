from django.db import models
from core.models import Order

class PaymentTable(models.Model):


    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment', null=True, blank=True)
    stripe_payment_id = models.CharField(max_length=255) 
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default='')
    success = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        try:
            return f'Payment {self.id} for Order {self.order.order_id}'
        except Exception:
            return f'Payment {self.id} (No associated order)'
    