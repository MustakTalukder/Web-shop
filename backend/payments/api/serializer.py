# payments/serializers.py

from rest_framework import serializers
from payments.models import PaymentTable as Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['stripe_payment_id', 'amount', 'status', 'success', 'created_at', 'updated_at'] #