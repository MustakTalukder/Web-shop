import Header1 from "@/components/headers/Header1";
import Home from "@/components/homes/Home";
import Footers from "@/components/footers/Footers";
import MetaComponent from "@/components/common/MetaComponent";
import ProductList from "@/data/productList";
const metadata = {
  title: "Home",
  description: "Home Page",
};
export default function HomePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <Home />
        <ProductList />
        <Footers />
      </main>
    </>
  );
}
