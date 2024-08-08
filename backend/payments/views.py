from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
# views.py
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import stripe
import json

stripe.api_key = settings.STRIPE_SK_KEY
@csrf_exempt
@require_POST
def create_payment_intent(request):
    try:
        data = json.loads(request.body)
        amount = data.get('amount')

        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd'
        )

        return JsonResponse({
            'clientSecret': payment_intent['client_secret'],
            'details': payment_intent,
            
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@require_POST
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        return JsonResponse({'error': str(e)}, status=400)
    except stripe.error.SignatureVerificationError as e:
        return JsonResponse({'error': str(e)}, status=400)

    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        # Handle the payment success (e.g., save the payment info in your database)

    return JsonResponse({'status': 'success'}, status=200)
