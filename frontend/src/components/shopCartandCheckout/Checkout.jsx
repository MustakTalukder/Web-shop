import { useContextElement } from "@/context/Context";
import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";

export default function Checkout() {
  const { cartProducts, totalPrice, billingDetails, updateBillingDetails } = useContextElement();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const field = id.replace('checkout_', ''); // Remove the 'checkout_' prefix to get the field name
    updateBillingDetails(field, value);
  };

  const validateFields = () => {
    let validationErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!billingDetails.email || !emailPattern.test(billingDetails.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }
    if (!billingDetails.address) {
      validationErrors.address = "Address is required.";
    }
    
    setErrors(validationErrors);
    
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      navigate('/payment');
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="checkout-form">
        <div className="billing-info__wrapper">
          <h4>BILLING DETAILS</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="checkout_firstName"
                  placeholder="First Name"
                  value={billingDetails.firstName}
                  onChange={handleInputChange}
                />
                <label htmlFor="checkout_first_name">First Name</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="checkout_lastName"
                  placeholder="Last Name"
                  value={billingDetails.lastName}
                  onChange={handleInputChange}
                />
                <label htmlFor="checkout_last_name">Last Name</label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-floating mt-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="checkout_address"
                  placeholder="Street Address *"
                  value={billingDetails.address}
                  onChange={handleInputChange}
                />
                <label htmlFor="checkout_street_address">Address *</label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="email"
                  className="form-control"
                  id="checkout_email"
                  placeholder="Your Mail *"
                  value={billingDetails.email}
                  onChange={handleInputChange}
                />
                <label htmlFor="checkout_email">Your Mail *</label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="mt-3">
                <textarea
                  className="form-control form-control_gray"
                  id="checkout_orderNotes"
                  placeholder="Order Notes (optional)"
                  cols="30"
                  rows="8"
                  value={billingDetails.orderNotes}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="checkout__totals-wrapper">
          <div className="sticky-content">
            <div className="checkout__totals">
              <h3>Your Order</h3>
              <table className="checkout-cart-items">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((elm, i) => (
                    <tr key={i}>
                      <td>
                        {elm.name} x {elm.quantity}
                      </td>
                      <td>${elm.price * elm.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="checkout-totals">
                <tbody>
                  <tr>
                    <th>SUBTOTAL</th>
                    <td>${totalPrice}</td>
                  </tr>
                  <tr>
                    <th>SHIPPING</th>
                    <td>Free shipping</td>
                  </tr>
                  <tr>
                    <th>VAT</th>
                    <td>${totalPrice && 19}</td>
                  </tr>
                  <tr>
                    <th>TOTAL</th>
                    <td>${totalPrice && totalPrice + 19}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="checkout__payment-methods">
              <div className="form-check">
                <input
                  className="form-check-input form-check-input_fill"
                  type="radio"
                  name="checkout_payment_method"
                  id="checkout_payment_method_2"
                  defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="checkout_payment_method_2"
                >
                  Card Payment
                  <span className="option-detail d-block">
                    Phasellus sed volutpat orci. Fusce eget lore mauris vehicula
                    elementum gravida nec dui. Aenean aliquam varius ipsum, non
                    ultricies tellus sodales eu. Donec dignissim viverra nunc,
                    ut aliquet magna posuere eget.
                  </span>
                </label>
              </div>
              <div className="policy-text">
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our
                <Link to="/terms" target="_blank">
                  privacy policy
                </Link>
                .
              </div>
            </div>
            <button className="btn btn-primary btn-checkout" onClick={handleSubmit}>
            NEXT
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
