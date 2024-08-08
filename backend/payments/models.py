from django.db import models
from django.utils import timezone
from core.models import Order

class PaymentTable(models.Model):


    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment', null=True, blank=True)
    stripe_payment_id = models.CharField(max_length=255) 
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default='')
    success = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    transaction_id = models.CharField(max_length=100, unique=True, editable=False)

    def save(self, *args, **kwargs):
        if not self.transaction_id:
            self.transaction_id = self.generate_transaction_id()
        super().save(*args, **kwargs)

    def generate_transaction_id(self):
        return f'TXN-{timezone.now().strftime("%Y%m%d%H%M%S")}'


    def __str__(self):
        try:
            return f'Payment {self.id} for Order {self.order.order_id}'
        except Exception:
            return f'Payment {self.id} (No associated order)'
    