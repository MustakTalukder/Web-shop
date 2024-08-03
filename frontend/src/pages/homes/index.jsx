import Header1 from "@/components/headers/Header1";


import Products2 from "@/components/homes/Products2";

import Footers from "@/components/footers/Footers";
import MetaComponent from "@/components/common/MetaComponent";
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
      
        <Products2 />
        
        {/* <Home /> */}
        {/* <ProductList /> */}
        <Footers />
      </main>
    </>
  );
}
