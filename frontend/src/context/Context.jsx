
// /* eslint-disable react/prop-types */
// // import { allProducts } from "@/data/products";
// import React, { useEffect } from "react";
// import { useContext, useState } from "react";
// const dataContext = React.createContext();
// // eslint-disable-next-line react-refresh/only-export-components
// export const useContextElement = () => {
//   return useContext(dataContext);
// };

// export default function Context({ children }) {
//   const [cartProducts, setCartProducts] = useState([]);
//   const [wishList, setWishList] = useState([]);
//   const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   useEffect(() => {
//     const subtotal = cartProducts.reduce((accumulator, product) => {
//       return accumulator + product.quantity * product.price;
//     }, 0);
//     setTotalPrice(subtotal);
//   }, [cartProducts]);

//   const addProductToCart = (id) => {
//     if (!cartProducts.filter((elm) => elm.id == id)[0]) {
//       const item = {
//         ...allProducts.filter((elm) => elm.id == id)[0],
//         quantity: 1,
//       };
//       setCartProducts((pre) => [...pre, item]);

//       document
//         .getElementById("cartDrawerOverlay")
//         .classList.add("page-overlay_visible");
//       document.getElementById("cartDrawer").classList.add("aside_visible");
//     }
//   };
//   const isAddedToCartProducts = (id) => {
//     if (cartProducts.filter((elm) => elm.id == id)[0]) {
//       return true;
//     }
//     return false;
//   };

//   const toggleWishlist = (id) => {
//     if (wishList.includes(id)) {
//       setWishList((pre) => [...pre.filter((elm) => elm != id)]);
//     } else {
//       setWishList((pre) => [...pre, id]);
//     }
//   };
//   const isAddedtoWishlist = (id) => {
//     if (wishList.includes(id)) {
//       return true;
//     }
//     return false;
//   };
//   useEffect(() => {
//     const items = JSON.parse(localStorage.getItem("cartList"));
//     if (items?.length) {
//       setCartProducts(items);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cartList", JSON.stringify(cartProducts));
//   }, [cartProducts]);
//   useEffect(() => {
//     const items = JSON.parse(localStorage.getItem("wishlist"));
//     if (items?.length) {
//       setWishList(items);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("wishlist", JSON.stringify(wishList));
//   }, [wishList]);

//   const contextElement = {
//     cartProducts,
//     setCartProducts,
//     totalPrice,
//     addProductToCart,
//     isAddedToCartProducts,
//     toggleWishlist,
//     isAddedtoWishlist,
//     quickViewItem,
//     wishList,
//     setQuickViewItem,
//   };
//   return (
//     <dataContext.Provider value={contextElement}>
//       {children}
//     </dataContext.Provider>
//   );
// }


import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

const dataContext = React.createContext();

export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:8000/api/product-list/");
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
      return accumulator + product.quantity * product.price;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  const addProductToCart = (id) => {
    const product = products.find((product) => product.id === id);
    if (product && !cartProducts.some((item) => item.id === id)) {
      const item = { ...product, quantity: 1 };
      setCartProducts((prev) => [...prev, item]);

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
  };

  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
