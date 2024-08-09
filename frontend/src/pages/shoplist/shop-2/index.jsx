
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footers from "@/components/footers/Footers";
import Header1 from "@/components/headers/Header1";
import Shop2 from "@/components/shoplist/Shop2";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Shop 2 || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};

export default function ShopPage2() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { name } = useParams();
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products-search/?category=${name}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, [products]);
  console.log(products);
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Shop2 products={products} />
        )}
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footers />
    </>
  );
}
