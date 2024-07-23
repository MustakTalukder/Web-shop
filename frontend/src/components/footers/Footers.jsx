import { Link } from "react-router-dom";

import {
    footerLinks1,
    footerLinks2,
    footerLinks3,
    socialLinks,
} from "@/data/footer";

export default function Footer() {
    return (
        <footer className="footer footer_type_1">
            <div className="footer-middle container">
                <div className="row row-cols-lg-5 row-cols-2">
                    <div className="footer-column footer-store-info col-12 mb-4 mb-lg-0">
                        <div className="logo">
                            <Link to="/">
                                <img
                                    src="/assets/images/logo.JPG"
                                    width={112}
                                    height={28}
                                    alt="WebShop"
                                    className="logo__image d-block"
                                />
                            </Link>
                        </div>
                        {/* <!-- /.logo --> */}
                        <p className="footer-address">
                            Nibelungenpl. 1, 60318 Frankfurt am Main
                        </p>

                        <p className="m-0">
                            <strong className="fw-medium">admin@webshop.com</strong>
                        </p>
                        <p>
                            <strong className="fw-medium">+49 01536556465154515</strong>
                        </p>

                        <ul className="social-links list-unstyled d-flex flex-wrap mb-0">
                            {socialLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="footer__social-link d-block">
                                        <svg
                                            className={link.className}
                                            width={link.width}
                                            height={link.height}
                                            viewBox={link.viewBox}
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            {typeof link.icon === "string" ? (
                                                <use href={link.icon} />
                                            ) : (
                                                link.icon
                                            )}
                                        </svg>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <!-- /.footer-column --> */}

                    <div className="footer-column footer-menu mb-4 mb-lg-0">
                        <h5 className="sub-menu__title text-uppercase">Company</h5>
                        <ul className="sub-menu__list list-unstyled">
                            {footerLinks1.map((elm, i) => (
                                <li key={i} className="sub-menu__item">
                                    <Link to={elm.href} className="menu-link menu-link_us-s">
                                        {elm.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <!-- /.footer-column --> */}
                    <div className="footer-column footer-menu mb-4 mb-lg-0">
                        <h5 className="sub-menu__title text-uppercase">Shop</h5>
                        <ul className="sub-menu__list list-unstyled">
                            {footerLinks2.map((elm, i) => (
                                <li key={i} className="sub-menu__item">
                                    <Link to={elm.href} className="menu-link menu-link_us-s">
                                        {elm.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <!-- /.footer-column --> */}
                    <div className="footer-column footer-menu mb-4 mb-lg-0">
                        <h5 className="sub-menu__title text-uppercase">Help</h5>
                        <ul className="sub-menu__list list-unstyled">
                            {footerLinks3.map((elm, i) => (
                                <li key={i} className="sub-menu__item">
                                    <Link to={elm.href} className="menu-link menu-link_us-s">
                                        {elm.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <!-- /.footer-column --> */}
                    <div className="footer-column footer-newsletter col-12 mb-4 mb-lg-0">
                        <h5 className="sub-menu__title text-uppercase">Subscribe</h5>
                        <p>
                            Be the first to get the latest news about trends, promotions, and
                            much more!
                        </p>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="footer-newsletter__form position-relative bg-body"
                        >
                            <input
                                className="form-control border-white"
                                type="email"
                                name="email"
                                placeholder="Your email address"
                            />
                            <input
                                className="btn-link fw-medium bg-white position-absolute top-0 end-0 h-100"
                                type="submit"
                                defaultValue="JOIN"
                            />
                        </form>

                        <div className="mt-4 pt-3">
                            <strong className="fw-medium">Secure payments</strong>
                            <p className="mt-2">
                                <img
                                    loading="lazy"
                                    width={324}
                                    height={38}
                                    src="/assets/images/payment-options.png"
                                    alt="Acceptable payment gateways"
                                    className="mw-100"
                                />
                            </p>
                        </div>
                    </div>
                    {/* <!-- /.footer-column --> */}
                </div>
                {/* <!-- /.row-cols-5 --> */}
            </div>
            {/* <!-- /.footer-middle container --> */}

            <div className="footer-bottom container">
                <div className="d-block d-md-flex align-items-center">
                    <span className="footer-copyright me-auto">
                        ©{new Date().getFullYear()} WebShop
                    </span>
                    {/* <!-- /.footer-settings --> */}
                </div>
                {/* <!-- /.d-flex --> */}
            </div>
            {/* <!-- /.footer-bottom container --> */}
        </footer>
    );
}
