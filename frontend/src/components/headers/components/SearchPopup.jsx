// import { Link } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";

// export default function SearchPopup() {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const containerRef = useRef(null);

//   const handleClickOutside = (event) => {
//     if (containerRef.current && !containerRef.current.contains(event.target)) {
//       setIsPopupOpen(false);
//     }
//   };

//   useEffect(() => {
//     // Add event listener for clicks
//     document.addEventListener("click", handleClickOutside);

//     // Clean up the event listener on component unmount
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);
//   return (
//     <div
//       ref={containerRef}
//       className={`header-tools__item hover-container ${
//         isPopupOpen ? "js-content_visible" : ""
//       }`}
//     >
//       <div className="js-hover__open position-relative">
//         <a
//           onClick={() => setIsPopupOpen((pre) => !pre)}
//           className="js-search-popup search-field__actor"
//           href="#"
//         >
//           <svg
//             className="d-block"
//             width="20"
//             height="20"
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <use href="#icon_search" />
//           </svg>
//           <i className="btn-icon btn-close-lg"></i>
//         </a>
//       </div>

//       <div className="search-popup js-hidden-content">
//         <form
//           onSubmit={(e) => e.preventDefault()}
//           className="search-field container"
//         >
//           <p className="text-uppercase text-secondary fw-medium mb-4">
//             What are you looking for?
//           </p>
//           <div className="position-relative">
//             <input
//               className="search-field__input search-popup__input w-100 fw-medium"
//               type="text"
//               name="search-keyword"
//               placeholder="Search products"
//             />
//             <button className="btn-icon search-popup__submit" type="submit">
//               <svg
//                 className="d-block"
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <use href="#icon_search" />
//               </svg>
//             </button>
//             <button
//               className="btn-icon btn-close-lg search-popup__reset"
//               type="reset"
//             ></button>
//           </div>

//         </form>
//         {/* <!-- /.header-search --> */}
//       </div>
//       {/* <!-- /.search-popup --> */}
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function SearchPopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsPopupOpen(false);
    }
  };

  const fetchSearchResults = async (keyword) => {
    if (keyword.trim() !== "") {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products-search/?search=${keyword}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Error fetching search results");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const debouncedFetchSearchResults = debounce(fetchSearchResults, 300);

  const handleInputChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    debouncedFetchSearchResults(keyword);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`header-tools__item hover-container ${
        isPopupOpen ? "js-content_visible" : ""
      }`}
    >
      <div className="js-hover__open position-relative">
        <a
          onClick={() => setIsPopupOpen((pre) => !pre)}
          className="js-search-popup search-field__actor"
          href="#"
        >
          <svg
            className="d-block"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#icon_search" />
          </svg>
          <i className="btn-icon btn-close-lg"></i>
        </a>
      </div>

      <div className="search-popup js-hidden-content">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="search-field container"
        >
          <p className="text-uppercase text-secondary fw-medium mb-4">
            What are you looking for?
          </p>
          <div className="position-relative">
            <input
              className="search-field__input search-popup__input w-100 fw-medium"
              type="text"
              name="search-keyword"
              placeholder="Search products"
              value={searchKeyword}
              onChange={handleInputChange}
            />
            <button className="btn-icon search-popup__submit" type="submit">
              <svg
                className="d-block"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_search" />
              </svg>
            </button>
            <button
              className="btn-icon btn-close-lg search-popup__reset"
              type="reset"
              onClick={() => setSearchKeyword("")}
            ></button>
          </div>
        </form>

        <div className="search-results container mt-3">
          {searchResults.length > 0 ? (
            searchResults.map((product, index) => (
              <div key={index} className="search-result-item">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </div>
            ))
          ) : (
            searchKeyword && <p>No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
