
import { useEffect, useState } from "react";
import Header1 from "@/components/headers/Header1";
import Footers from "@/components/footers/Footers";

import SingleProduct12 from "@/components/singleProduct/SingleProduct";
import MetaComponent from "@/components/common/MetaComponent";
import { useParams } from "react-router-dom";
import axios from "axios";

const metadata = {
  title: "Shop Single 1 || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};

export default function ProductDetailsPage1() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/product-detail/${id}/`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error);
        setLoading(false);
      }
    }
    fetchProductDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details.</p>;

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-md-1 pb-md-3"></div>
        <SingleProduct12 product={product} />
        
      </main>
      <Footers />
    </>
  );
}
