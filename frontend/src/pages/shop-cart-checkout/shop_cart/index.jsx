
import Footer1 from "@/components/footers/Footers";
import Header1 from "@/components/headers/Header1";
import Cart from "@/components/shopCartandCheckout/Cart";
import ChectoutSteps from "@/components/shopCartandCheckout/ChectoutSteps";

export default function ShopCartPage() {
    return (
        <>
            <Header1 />
            <main className="page-wrapper">
                <div className="mb-4 pb-4"></div>
                <section className="shop-checkout container">
                    <h2 className="page-title">Cart</h2>
                    <ChectoutSteps />
                    <Cart />
                </section>
            </main>
            <div className="mb-5 pb-xl-5"></div>
            <Footer1 />
        </>
    );
}
