
import Footer from "@/components/footers/Footers";
import Header from "@/components/headers/Header1";

import ChectoutSteps from "@/components/shopCartandCheckout/ChectoutSteps";
import OrderCompleted from "@/components/shopCartandCheckout/OrderCompleted";
export default function ShopOrderConplate() {
  return (
    <>
      <Header />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="shop-checkout container">
          <h2 className="page-title">ORDER RECEIVED</h2>
          <ChectoutSteps />
          <OrderCompleted />
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer />
    </>
  );
}
