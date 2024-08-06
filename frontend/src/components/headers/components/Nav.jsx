
// import { Link, useLocation } from "react-router-dom";
// import { useEffect } from "react";

// export default function Nav() {
//   const { pathname } = useLocation();
//   useEffect(() => {
//     function setBoxMenuPosition(menu) {
//       const scrollBarWidth = 17; // You might need to calculate or define this value
//       const limitR = window.innerWidth - menu.offsetWidth - scrollBarWidth;
//       const limitL = 0;
//       const menuPaddingLeft = parseInt(
//         window.getComputedStyle(menu, null).getPropertyValue("padding-left")
//       );
//       const parentPaddingLeft = parseInt(
//         window
//           .getComputedStyle(menu.previousElementSibling, null)
//           .getPropertyValue("padding-left")
//       );
//       const centerPos =
//         menu.previousElementSibling.offsetLeft -
//         menuPaddingLeft +
//         parentPaddingLeft;

//       let menuPos = centerPos;
//       if (centerPos < limitL) {
//         menuPos = limitL;
//       } else if (centerPos > limitR) {
//         menuPos = limitR;
//       }

//       menu.style.left = `${menuPos}px`;
//     }
//     document.querySelectorAll(".box-menu").forEach((el) => {
//       setBoxMenuPosition(el);
//     });
//   }, []);
//   return (
//     <>
      
//       <li className="navigation__item">
//         <Link
//           to="/home"
//           className={`navigation__link ${
//             pathname == "/home" ? "menu-active" : ""
//           }`}
//         >
//           Home
//         </Link>
//         <div className="box-menu" style={{ width: "800px" }}>
//           <div className="col pe-4">
//             <ul className="sub-menu__list list-unstyled">
//               {homePages.slice(0, 6).map((elm, i) => (
//                 <li key={i} className="sub-menu__item">
//                   <Link
//                     to={elm.href}
//                     className={`menu-link menu-link_us-s ${
//                       isMenuActive(elm.href) ? "menu-active" : ""
//                     }`}
//                   >
//                     {elm.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
        
//       </li>
//       <li className="navigation__item">
//         <Link
//           to="/about"
//           className={`navigation__link ${
//             pathname == "/about" ? "menu-active" : ""
//           }`}
//         >
//           About
//         </Link>
//       </li>
//     </>
//   );
// }

// import { Link, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from 'axios';

// export default function Nav() {
//   const { pathname } = useLocation();
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // Fetch categories and subcategories from the API
//     async function fetchCategories() {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/show-all-categories-and-subcategories/');
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     }

//     fetchCategories();

//     function setBoxMenuPosition(menu) {
//       const scrollBarWidth = 17; // You might need to calculate or define this value
//       const limitR = window.innerWidth - menu.offsetWidth - scrollBarWidth;
//       const limitL = 0;
//       const menuPaddingLeft = parseInt(
//         window.getComputedStyle(menu, null).getPropertyValue("padding-left")
//       );
//       const parentPaddingLeft = parseInt(
//         window
//           .getComputedStyle(menu.previousElementSibling, null)
//           .getPropertyValue("padding-left")
//       );
//       const centerPos =
//         menu.previousElementSibling.offsetLeft -
//         menuPaddingLeft +
//         parentPaddingLeft;

//       let menuPos = centerPos;
//       if (centerPos < limitL) {
//         menuPos = limitL;
//       } else if (centerPos > limitR) {
//         menuPos = limitR;
//       }

//       menu.style.left = `${menuPos}px`;
//     }

//     document.querySelectorAll(".box-menu").forEach((el) => {
//       setBoxMenuPosition(el);
//     });
//   }, []);

//   return (
//     <ul className="navigation">
//       <li className="navigation__item">
//         <Link
//           to="/home"
//           className={`navigation__link ${pathname === "/home" ? "menu-active" : ""}`}
//         >
//           Home
//         </Link>
//         <div className="box-menu" style={{ width: "800px" }}>
//           <div className="col pe-4">
//             <ul className="sub-menu__list list-unstyled">
//               {/* Example of dynamically generating menu items */}
//               {/* You may need to adjust based on your actual structure */}
//               {categories.map(category => (
//                 <li key={category.id} className="sub-menu__item">
//                   <span className="menu-link menu-link_us-s">
//                     {category.name}
//                   </span>
//                   <ul className="sub-menu__list list-unstyled">
//                     {category.subcategories.map(subcategory => (
//                       <li key={subcategory.id} className="sub-menu__item">
//                         <Link
//                           to={`/subcategory/${subcategory.id}`}
//                           className={`menu-link menu-link_us-s ${
//                             pathname === `/subcategory/${subcategory.id}` ? "menu-active" : ""
//                           }`}
//                         >
//                           {subcategory.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </li>
//       {/* <li className="navigation__item">
//         <Link
//           to="/about"
//           className={`navigation__link ${pathname === "/about" ? "menu-active" : ""}`}
//         >
//           About
//         </Link>
//       </li> */}
//     </ul>
//   );
// }

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/common/Loading";

export default function Nav() {
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMenuActive = (menu) => {
    return menu.split("/")[1] === pathname.split("/")[1];
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/show-all-categories-and-subcategories/"
        );
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error);
        setLoading(false);
      }
    }

    fetchCategories();

    function setBoxMenuPosition(menu) {
      const scrollBarWidth = 17; // You might need to calculate or define this value
      const limitR = window.innerWidth - menu.offsetWidth - scrollBarWidth;
      const limitL = 0;
      const menuPaddingLeft = parseInt(
        window.getComputedStyle(menu, null).getPropertyValue("padding-left")
      );
      const parentPaddingLeft = parseInt(
        window
          .getComputedStyle(menu.previousElementSibling, null)
          .getPropertyValue("padding-left")
      );
      const centerPos =
        menu.previousElementSibling.offsetLeft -
        menuPaddingLeft +
        parentPaddingLeft;

      let menuPos = centerPos;
      if (centerPos < limitL) {
        menuPos = limitL;
      } else if (centerPos > limitR) {
        menuPos = limitR;
      }

      menu.style.left = `${menuPos}px`;
    }

    document.querySelectorAll(".box-menu").forEach((el) => {
      setBoxMenuPosition(el);
    });
  }, []);

  if (loading) return '';
  if (error) return <p>Error loading categories.</p>;

  return (
    <>
      {categories.map((category) => (
        <li className="navigation__item" key={category.id}>
          {/* <a
            href="#"
            className={`navigation__link ${
              isMenuActive(category.name) ? "menu-active" : ""
            }`}
          >
            {category.name}
          </a> */}

          <Link
            to={`/shop-2/${category.name}`}
            className={`navigation__link ${
              isMenuActive(`/category/${category.id}`) ? "menu-active" : ""
            }`}
          >
            {category.name}
          </Link>
          {category.subcategories && category.subcategories.length > 0 && (
            <ul className="default-menu list-unstyled">
              {category.subcategories.map((subcategory) => (
                <li key={subcategory.id} className="sub-menu__item">
                  <Link
                    to={`/shop-2/${subcategory.name}`}
                    className={`menu-link menu-link_us-s ${
                      isMenuActive(`/subcategory/${subcategory.id}`)
                        ? "menu-active"
                        : ""
                    }`}
                  >
                    {subcategory.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </>
  );
}
