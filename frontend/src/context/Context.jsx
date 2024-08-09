import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

const dataContext = React.createContext();

export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [completeCartData, setCompleteCartData] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    orderNotes: ''
  });
  const updateBillingDetails = (field, value) => {
    setBillingDetails({
      ...billingDetails,
      [field]: value
    });
  };

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL+"/api/product-list/");
        setProducts(response.data);
        setQuickViewItem(response.data[0]); // Set the first product as the default quick view item
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      const totalPrice = accumulator + product.quantity * product.price;
      const formattedNumber = Number(totalPrice.toFixed(2));
      return formattedNumber;
    }, 0);
    setTotalPrice(subtotal);
  }, [completeCartData]);

  
  const removeProductsByIds = (ids) => {
    setCartProducts((prevProducts) => prevProducts.filter(product => !ids.includes(product.id)));
  };

  
  const updateCompleteCartData = () => {
    setCompleteCartData([...cartProducts]);
  };

  const addProductToCart = (id) => {
    const product = products.find((product) => product.id === id);
    if (product && !cartProducts.some((item) => item.id === id)) {
      const item = { ...product, quantity: 1 };
      setCartProducts((prev) => [...prev, item]);
      updateCompleteCartData();
      document
        .getElementById("cartDrawerOverlay")
        .classList.add("page-overlay_visible");
      document.getElementById("cartDrawer").classList.add("aside_visible");
    }
  };

  const isAddedToCartProducts = (id) => {
    return cartProducts.some((product) => product.id === id);
  };

  const toggleWishlist = (id) => {
    if (wishList.includes(id)) {
      setWishList((prev) => prev.filter((productId) => productId !== id));
    } else {
      setWishList((prev) => [...prev, id]);
    }
  };

  const isAddedtoWishlist = (id) => {
    return wishList.includes(id);
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartList"));
    if (items?.length) {
      setCartProducts(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist"));
    if (items?.length) {
      setWishList(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const contextElement = {
    products,
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    toggleWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    billingDetails,
    updateBillingDetails,
    removeProductsByIds,
    completeCartData
  };

  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
