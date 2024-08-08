/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import Svgs from "@/components/common/Svgs";
import ShopSingle from "./pages/shopSingle";
import "react-tooltip/dist/react-tooltip.css";
import "./styles/style.scss";
import "rc-slider/assets/index.css";
import "tippy.js/dist/tippy.css";
import Context from "@/context/Context";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CartDrawer from "./components/shopCartandCheckout/CartDrawer";
import MobileHeader from "./components/headers/MobileHeader";
import HomePage from "./pages/homes";
import NotFound from "./pages/not-found";
import AboutPage from "./pages/otherPages/about";
import ShopCartPage from "./pages/shop-cart-checkout/shop_cart";
import ShopCheckoutPage from "./pages/shop-cart-checkout/check_out";
import ShopOrderConplate from "./pages/shop-cart-checkout/shop_order_complate";
import PaymentApp from "./components/shopCartandCheckout/PaymentApp";

import ShopPage2 from "./pages/shoplist/shop-2";
function App() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);
  return (
    <>
      <Svgs />
      <Context>
      <MobileHeader />
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="8" element={<NotFound />} />
            <Route path="shop_cart" element={<ShopCartPage />} />
            <Route path="shop_checkout" element={<ShopCheckoutPage />} />
            <Route path="/shop_order_complete/:orderId" element={<ShopOrderConplate />} />
            <Route path="payment" element={<PaymentApp />} />
            <Route path="product/:id" element={<ShopSingle />} />
            <Route path="shop-2/:name" element={<ShopPage2 />} />
          </Route>
        </Routes>
        <CartDrawer />
      </Context>

      <div className="page-overlay" id="pageOverlay"></div>

    </>
  );
}

export default App;

