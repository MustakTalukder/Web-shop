import React from 'react';
import ReactDOM from 'react-dom';
import Footer from "@/components/footers/Footers";
import Header1 from "@/components/headers/Header1";
import PaymentApp from "@/components/shopCartandCheckout/PaymentApp";
import ChectoutSteps from "@/components/shopCartandCheckout/ChectoutSteps";

export default function Payment() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="shop-checkout container">
          <h2 className="page-title">Payment</h2>
          <ChectoutSteps />
          <PaymentApp />
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer />
    </>
  );
}