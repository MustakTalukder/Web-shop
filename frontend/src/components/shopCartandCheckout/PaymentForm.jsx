// PaymentForm.js
import React, { useState, useEffect } from 'react';
import { useContextElement } from "@/context/Context";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../../styles/paymentForm.css';
import { Link } from "react-router-dom";

const PaymentForm = () => {
  const { cartProducts,totalPrice, billingDetails } = useContextElement();
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');

  
  const createPaymentIntent = async () => {

    try {
      const productDetails = {
        amount: cartProducts.price
      }
      
      const response = await fetch('http://127.0.0.1:8000/payments/create-payment-intent/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({amount: totalPrice*100}), // amount in cents
      });
      if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error);
      }
      const data = await response.json();
      setClientSecret(data.clientSecret);
      setPaymentDetails(data.details);
      
    } catch (error) {
      setError('Failed to create payment intent');
    }
  };

  useEffect(() => {
    createPaymentIntent();
    console.log("payment");
    console.log(cartProducts);
    console.log("===DETAILS===");
    console.log(billingDetails);
    
    
  }, []);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },


    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      console.log("===payment Details after success==");
      console.log(payload);
      console.log("==payment Details from strip===");
      console.log(paymentDetails);
      
      const orderDetails = {
        paymentId: paymentDetails.id,
        totalPrice: totalPrice,
        address: billingDetails.address,
        email: billingDetails.email,
        firstName: billingDetails.firstName,
        lastName: billingDetails.lastName,
        description: billingDetails.orderNotes,
        orderedItem: cartProducts
      }
      console.log("orderDetails====");
      console.log(orderDetails);

      try {
        // Step 1: Create order
        const response = await fetch('http://127.0.0.1:8000/api/orders/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderDetails),
        });
        
        // Step 2: Parse the JSON response
        const responseData = await response.json();
        console.log("Response Data ==", responseData);

        // Step 3: Extract order_id and userEmail from response data
        const orderId = responseData.order_id;
        const userEmail = billingDetails.email;
        console.log("Order ID =", orderId);
        console.log("Order Email =", userEmail);

        // Step 4: Send email
        const sendMail = async (email, orderId) => {
          try {
            const mailResponse = await fetch(`http://127.0.0.1:8000/api/send-mail/?email=${email}&order_id=${orderId}`, {
              method: 'GET',
            });

            if (!mailResponse.ok) {
              throw new Error('Network response was not ok');
            }

            const data = await mailResponse.json();
            console.log("Mail Response Data =", data);
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
        };

        // Call sendMail function
        await sendMail(userEmail, orderId);

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    
      
      //window.location.href = "http://localhost:3000/shop_order_complete";
    }
  };

  return (

    <div className="payment-card">
    <img src={`https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg`} alt="Stripe Logo" className="stripe-logo" />
    <p><Link to="/shop_checkout"><u>Back To Shopping Cart</u></Link></p>
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" onChange={handleChange} />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            'Pay now'
          )}
        </span>
      </button>
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {succeeded && (
        <p className="result-message">
          Payment succeeded
        </p>
      )}
    </form>
    </div>
    
  );
};

export default PaymentForm;
