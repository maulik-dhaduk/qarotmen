import React from "react";
import { Link, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-white">
      <div className="bg-light border-bottom">
        <div className="container py-3">
          <div className="row align-items-center text-center text-md-start">
            <div className="col-12 col-md-3 mb-3 mb-md-0">
              <Link to="/" className="navbar-brand fw-semibold fs-4 fs-lg-3 logo ms-2 me-0  ms-lg-0">
                QAROT
              </Link>
            </div>
            <div className="col-12 col-md-6 position-relative mb-3 mb-md-0">
              <div className="d-flex justify-content-center align-items-center position-relative">
                <div className="d-none d-md-block position-absolute w-75" style={{ height: "1px", background: "#ccc", top: "20px", zIndex: 0, }}></div>

                {["CART", "ADDRESS", "PAYMENT"].map((step, index) => (
                  <div key={index} className="text-center position-relative z-1 mx-3 mx-md-5">
                    <div className={`rounded-circle d-flex justify-content-center align-items-center mx-auto bg-success text-white`} style={{ width: "38px", height: "38px" }}>
                      {index + 1}
                    </div>

                    <div style={{ fontSize: "12px", letterSpacing: "2px" }}>
                      {step}
                    </div>

                  </div>
                ))}
              </div>
            </div>


            <div className="col-12 col-md-3 d-flex justify-content-center justify-content-md-end align-items-center gap-2">

              <div className="bg-primary text-white d-flex justify-content-center align-items-center" style={{ width: "30px", height: "30px", borderRadius: "6px", }}>
                <img src="cart/secure-shippoing-icon.svg" />
              </div>

              <span style={{ fontSize: "14px" }}>100% SECURE</span>

            </div>

          </div>
        </div>
      </div>
      <div className="container-fluid bg-light d-flex align-items-center justify-content-center min-vh-100">
        <div className="card shadow-sm border-0 text-center p-4 p-md-5" style={{ maxWidth: "500px" }}>

          <div className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle" style={{ width: "80px", height: "80px", backgroundColor: "black", color: "#fff", fontSize: "36px"}}>
            ✓
          </div>

          <h3 className="fw-bold mb-2">Thank You for Your Order!</h3>
          <p className="text-muted mb-4">
            Your order has been placed successfully.
            We’ll notify you once it’s shipped.
          </p>

          <div className="border rounded-3 p-3 mb-4 bg-light">
            <p className="mb-1 fw-semibold">Estimated Delivery</p>
            <p className="text-muted small mb-0">Within 3 - 5 business days</p>
          </div>

          <div className="d-grid gap-2">
            <button className="btn text-white" style={{ backgroundColor: "black" }} onClick={() => navigate("/")}>
              CONTINUE SHOPPING
            </button>

            <button className="btn btn-outline-secondary" onClick={() => navigate("/order-detail")}>
              VIEW MY ORDERS
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
