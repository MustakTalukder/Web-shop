import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

import BreadCumb from "./BreadCumb";
import Pagination2 from "../common/Pagination2";
import ColorSelection from "../common/ColorSelection";
import Star from "../common/Star";
import { useContextElement } from "@/context/Context";
import { openModalShopFilter } from "@/utlis/aside";
import { menuCategories, sortingOptions } from "@/data/products/productCategories";
import FilterAll from "./filter/FilterAll";
// import PriceFilter from "./filter/PriceFilter"; // Import the PriceFilter component

const itemPerRow = [4];

export default function Shop2({ products }) {
  const { toggleWishlist, isAddedtoWishlist } = useContextElement();
  const { addProductToCart, isAddedToCartProducts } = useContextElement();
  const [selectedColView, setSelectedColView] = useState(4);
  const [currentCategory, setCurrentCategory] = useState(menuCategories[0]);
  const [filtered, setFiltered] = useState(products);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    let updatedFiltered = products;

    if (currentCategory !== "All") {
      updatedFiltered = updatedFiltered.filter((elm) => elm.category === currentCategory);
    }

    if (minPrice !== null && maxPrice !== null) {
      updatedFiltered = updatedFiltered.filter(
        (elm) => elm.price >= minPrice && elm.price <= maxPrice
      );
    }

    setFiltered(updatedFiltered);
  }, [currentCategory, products, minPrice, maxPrice]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePriceFilter = (value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      
      <div className="mb-4 pb-lg-3"></div>
      <section className="shop-main container d-flex">
        <div className="shop-sidebar side-sticky bg-body">
          <div
            onClick={openModalShopFilter}
            className="aside-header d-flex d-lg-none align-items-center"
          >
            <h3 className="text-uppercase fs-6 mb-0">Filter By</h3>
            <button className="btn-close-lg js-close-aside btn-close-aside ms-auto"></button>
          </div>

          <div className="pt-4 pt-lg-0"></div>

          <FilterAll onPriceChange={handlePriceFilter} /> {/* Pass the handlePriceFilter function */}
        </div>

        <div className="shop-list flex-grow-1">
          <div className="d-flex justify-content-between mb-4 pb-md-2">
            <div className="breadcrumb mb-0 d-none d-md-block flex-grow-1">
              <BreadCumb />
            </div>

            <div className="shop-acs d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
              

              <div className="shop-asc__seprator mx-3 bg-light d-none d-md-block order-md-0"></div>

              <div className="col-size align-items-center order-1 d-none d-lg-flex">
                <span className="text-uppercase fw-medium me-2">View</span>
                {itemPerRow.map((elm, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColView(elm)}
                    className={`btn-link fw-medium me-2 js-cols-size ${
                      selectedColView === elm ? "btn-link_active" : ""
                    } `}
                  >
                    {elm}
                  </button>
                ))}
              </div>

              <div className="shop-filter d-flex align-items-center order-0 order-md-3 d-lg-none">
                <button
                  className="btn-link btn-link_f d-flex align-items-center ps-0 js-open-aside"
                  onClick={openModalShopFilter}
                >
                  <svg
                    className="d-inline-block align-middle me-2"
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href="#icon_filter" />
                  </svg>
                  <span className="text-uppercase fw-medium d-inline-block align-middle">
                    Filter
                  </span>
                </button>
              </div>
              {/* <!-- /.col-size d-flex align-items-center ms-auto ms-md-3 --> */}
            </div>
            {/* <!-- /.shop-acs --> */}
          </div>
          {/* <!-- /.d-flex justify-content-between --> */}

          <div
            className={`products-grid row row-cols-2 row-cols-md-3  row-cols-lg-${selectedColView}`}
            id="products-grid"
          >
            {paginatedProducts.map((elm, i) => (
              <div key={i} className="product-card-wrapper">
                <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                  <div className="pc__img-wrapper">
                    <Swiper
                      className="shop-list-swiper  swiper-container background-img js-swiper-slider"
                      slidesPerView={1}
                      modules={[Navigation]}
                      navigation={{
                        prevEl: ".prev2" + i,
                        nextEl: ".next2" + i,
                      }}
                    >
                      {[elm.picture1, elm.picture2].map((picture, j) => (
                        <SwiperSlide key={j} className="swiper-slide">
                          <Link to={`/product/${elm.id}`}>
                            <img
                              loading="lazy"
                              src={`${import.meta.env.VITE_API_URL}/${picture}`}
                              width="330"
                              height="400"
                              alt={elm.name}
                              className="pc__img"
                            />
                          </Link>
                        </SwiperSlide>
                      ))}

                      <span
                        className={`cursor-pointer pc__img-prev ${
                          "prev2" + i
                        } `}
                      >
                        <svg
                          width="7"
                          height="11"
                          viewBox="0 0 7 11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_prev_sm" />
                        </svg>
                      </span>
                      <span
                        className={`cursor-pointer pc__img-next ${
                          "next2" + i
                        } `}
                      >
                        <svg
                          width="7"
                          height="11"
                          viewBox="0 0 7 11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_next_sm" />
                        </svg>
                      </span>
                    </Swiper>
                    <button
                      className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"
                      onClick={() => addProductToCart(elm.id)}
                      title={
                        isAddedToCartProducts(elm.id)
                          ? "Already Added"
                          : "Add to Cart"
                      }
                    >
                      {isAddedToCartProducts(elm.id)
                        ? "Already Added"
                        : "Add To Cart"}
                    </button>
                  </div>

                  <div className="pc__info position-relative">
                    <p className="pc__category">{elm.category}</p>
                    <h6 className="pc__title">
                    <Link to={`/product/${elm.id}`}>{elm.name}</Link>
                    </h6>
                    <div className="product-card__price d-flex">
                      <span className="money price">${elm.price}</span>
                    </div>
                    <div className="product-card__review d-flex align-items-center">
                      <div className="reviews-group d-flex">
                        <Star stars={elm.rating} />
                      </div>
                    </div>

                    <button
                      className={`pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist ${
                        isAddedtoWishlist(elm.id) ? "active" : ""
                      }`}
                      onClick={() => toggleWishlist(elm.id)}
                      title="Add To Wishlist"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_heart" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination2
            currentPage={currentPage}
            totalPages={Math.ceil(filtered.length / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  );
}

