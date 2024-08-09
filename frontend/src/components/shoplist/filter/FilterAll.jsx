
import {
    brands,
  //   categories,
  colors,
    filters,
   sizes,
   } from "@/data/products/productFilterOptions";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const isMenuActive = (menu) => {
  return menu.split("/")[1] === pathname.split("/")[1];
};

export default function FilterAll({ onPriceChange, onCategoryChange }) {
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const [activeSizes, setActiveSizes] = useState([]);
  const [activeBrands, setActiveBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [price, setPrice] = useState([20, 100]);

  const isMenuActive = (menu) => {
    return menu.split("/")[1] === pathname.split("/")[1];
  };
  
  useEffect(() => {
    // Fetch categories and subcategories data from the API
    axios
      .get(import.meta.env.VITE_API_URL+"/api/show-all-categories-and-subcategories/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Price range handler
  const handleOnChange = (value) => {
    setPrice(value);
    onPriceChange(value); // Call the prop function with the new price range
  };

  // Size toggle handler
  const toggleSize = (size) => {
    if (activeSizes.includes(size)) {
      setActiveSizes((pre) => [...pre.filter((elm) => elm !== size)]);
    } else {
      setActiveSizes((pre) => [...pre, size]);
    }
  };

  // Brands toggle handler
  const toggleBrands = (brand) => {
    if (activeBrands.includes(brand)) {
      setActiveBrands((pre) => [...pre.filter((elm) => elm !== brand)]);
    } else {
      setActiveBrands((pre) => [...pre, brand]);
    }
  };

  useEffect(() => {
    setActiveBrands((pre) => [
      ...pre.filter((elm) =>
        elm.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    ]);
  }, [searchQuery]);

  return (
    <>
      <div className="accordion" id="categories-list">
        <div className="accordion-item mb-4">
          <h5 className="accordion-header" id="accordion-heading-11">
            <button
              className="accordion-button p-0 border-0 fs-5 text-uppercase"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accordion-filter-1"
              aria-expanded="true"
              aria-controls="accordion-filter-1"
            >
              Product Categories
              <svg className="accordion-button__icon" viewBox="0 0 14 14">
                <g aria-hidden="true" stroke="none" fillRule="evenodd">
                  <path
                    className="svg-path-vertical"
                    d="M14,6 L14,8 L0,8 L0,6 L14,6"
                  />
                  <path
                    className="svg-path-horizontal"
                    d="M14,6 L14,8 L0,8 L0,6 L14,6"
                  />
                </g>
              </svg>
            </button>
          </h5>
          <div
            id="accordion-filter-1"
            className="accordion-collapse collapse show border-0"
            aria-labelledby="accordion-heading-11"
            data-bs-parent="#categories-list"
          >
            <div className="accordion-body px-0 pb-0">
              {categories.length === 0 ? (
                <div>Loading categories...</div>
              ) : (
                <ul className="list list-inline row row-cols-2 mb-0">
                  {categories.map((category) => (
                    <li key={category.id} className="list-item">
                      {/* <a
                        href="#"
                        className="menu-link py-1"
                        onClick={() => onCategoryChange(category.name)}
                      >
                        {category.name}
                      </a>
                       */}
                       <Link
                          to={`/shop-2/${category.name}`}
                          className={`navigation__link ${
                            isMenuActive(`/category/${category.id}`) ? "menu-active" : ""
                          }`}
                        >
                          {category.name}
                        </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        {/* /.accordion-item */}
      </div>

      {/* /.accordion */}
      <div className="accordion" id="price-filters">
        <div className="accordion-item mb-4">
          <h5 className="accordion-header mb-2" id="accordion-heading-price">
            <button
              className="accordion-button p-0 border-0 fs-5 text-uppercase"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accordion-filter-price"
              aria-expanded="true"
              aria-controls="accordion-filter-price"
            >
              Price
              <svg className="accordion-button__icon" viewBox="0 0 14 14">
                <g aria-hidden="true" stroke="none" fillRule="evenodd">
                  <path
                    className="svg-path-vertical"
                    d="M14,6 L14,8 L0,8 L0,6 L14,6"
                  />
                  <path
                    className="svg-path-horizontal"
                    d="M14,6 L14,8 L0,8 L0,6 L14,6"
                  />
                </g>
              </svg>
            </button>
          </h5>
          <div
            id="accordion-filter-price"
            className="accordion-collapse collapse show border-0"
            aria-labelledby="accordion-heading-price"
            data-bs-parent="#price-filters"
          >
            <Slider
              range
              formatLabel={() => ``}
              max={1000}
              min={0}
              defaultValue={price}
              onChange={(value) => handleOnChange(value)}
              id="slider"
            />
            <div className="price-range__info d-flex align-items-center mt-2">
              <div className="me-auto">
                <span className="text-secondary">Min Price: </span>
                <span className="price-range__min">${price[0]}</span>
              </div>
              <div>
                <span className="text-secondary">Max Price: </span>
                <span className="price-range__max">${price[1]}</span>
              </div>
            </div>
          </div>
        </div>
        {/* /.accordion-item */}
      </div>
      
    </>
  );
}
