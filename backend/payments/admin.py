from django.contrib import admin
from . import models


class PaymentAdmin(admin.ModelAdmin):
    list_display = ('stripe_payment_id', 'amount', 'status', 'success', 'transaction_id', 'created_at', 'updated_at')
    search_fields = ('stripe_payment_id', 'transaction_id', 'status')

# Register your models here.

admin.site.register(models.PaymentTable, PaymentAdmin)
#admin.site.register(models.PaymentTable)
