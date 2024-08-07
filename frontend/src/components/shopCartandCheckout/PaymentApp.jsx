import React from 'react'
import PaymentForm from '@/components/shopCartandCheckout/PaymentForm'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";

const stripePromise = loadStripe('pk_test_51PkkJk2N4Khf47fpCMVqs6yrH2KcGSN50iSmphhzEyUm4YVlImOH39gamp9dfiluj2Vn0Cugp2fsCcaCjCchssVt00pxmPaniE');


const PaymentApp = () => {
  return (
    <Elements stripe={stripePromise}>
        <PaymentForm />
    </Elements>
  )
}

export default PaymentApp