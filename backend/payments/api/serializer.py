# payments/serializers.py

from rest_framework import serializers
from payments.models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['stripe_charge_id', 'amount', 'timestamp', 'success']
