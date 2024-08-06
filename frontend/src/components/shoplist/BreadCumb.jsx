
import { Link } from "react-router-dom";
export default function BreadCumb() {
  return (
    <>
      

      <Link to="/" className="menu-link menu-link_us-s text-uppercase fw-medium">
        Home
      </Link>
      <span className="breadcrumb-separator menu-link fw-medium ps-1 pe-1">
        /
      </span>
      
    </>
  );
}
