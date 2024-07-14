import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./components/Nav";

import SearchPopup from "./components/SearchPopup";

export default function Header1() {
  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setScrollDirection("down");
        } else {
          // Scrolling up
          setScrollDirection("up");
        }
      } else {
        // Below 250px
        setScrollDirection("down");
      }

      lastScrollY.current = currentScrollY;
    };

    const lastScrollY = { current: window.scrollY };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      id="header"
      className={`header header_sticky ${
        scrollDirection == "up" ? "header_sticky-active" : "position-absolute"
      } `}
    >
      <div className="container">
        <div className="header-desk header-desk_type_1">
          <div className="none">
            <Link to="/home">
              <img
                src="/assets/images/logo-cloud.png"
                width={50}
                height={50}
                alt="Uomo"
                className="logo__image d-block"
              />
            </Link>
          </div>
          <nav className="navigation">
            <ul className="navigation__list list-unstyled d-flex">
              <Nav />
            </ul>
          </nav>

          <div className="header-tools d-flex align-items-center">
            <SearchPopup />
          </div>
        </div>
      </div>
    </header>
  );
}
