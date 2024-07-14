/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import Svgs from "@/components/common/Svgs";
import "react-tooltip/dist/react-tooltip.css";
import "./styles/style.scss";
import "rc-slider/assets/index.css";
import "tippy.js/dist/tippy.css";
import Context from "@/context/Context";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/homes";
import NotFound from "./pages/not-found";
import AboutPage from "./pages/otherPages/about";

function App() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);
  return (
    <>
      <Svgs />
      <Context>
        <Routes>
          <Route path="/">
            <Route index  element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="8" element={<NotFound />} />
          </Route>
        </Routes>
      </Context>
      <div className="page-overlay" id="pageOverlay"></div>

    </>
  );
}

export default App;
