import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Api from "../Services/Api"

const Payment = () => {
  const { cart, address, setCart, setAddress } = useCart();
  const [formData, setFormData] = useState({
    method: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
    upiId: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {

    let newErrors = {};

    if (formData.method === "card") {
      if (formData.cardNumber.length !== 16)
        newErrors.cardNumber = "16-digit card number required";

      if (!formData.expiry.includes("/"))
        newErrors.expiry = "MM/YY required";

      if (formData.cvv.length !== 3)
        newErrors.cvv = "3-digit CVV required";

      if (!formData.cardName.trim())
        newErrors.cardName = "Cardholder name required";
    }

    if (formData.method === "upi") {
      if (!formData.upiId.includes("@"))
        newErrors.upiId = "Invalid UPI ID";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const token = localStorage.getItem("token");

      await Api.post(
        "/placeorder",
        { shippingDetails: address, paymentMethod: formData.method },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart([]);
      setAddress(null);
      setFormData({
        method: "card",
        cardNumber: "",
        expiry: "",
        cvv: "",
        cardName: "",
        upiId: ""
      });

      navigate("/orderconfirmation")
      
    } catch (error) {
      console.error(error);
    }
  };



  const subtotal = cart.reduce(
    (total, item) => total + item.productId.price * item.qty,
    0
  )

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
                    <div className={`rounded-circle d-flex justify-content-center align-items-center mx-auto ${index === 0 ? "bg-success text-white" : index === 1 ? "bg-success text-white" : index === 2 ? "bg-primary text-white" : "border bg-white"}`} style={{ width: "38px", height: "38px" }}>
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

      <div className="container py-4">
        <div className="row">

          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body p-4">

                <h5 className="mb-3">Payment Information</h5>
                {["card", "upi", "cod"].map((type) => (

                  <div key={type} className={`border rounded-3 p-3 mb-2 d-flex align-items-center ${formData.method === type ? "border-dark bg-light" : "border-secondary"}`} style={{ cursor: "pointer" }} onClick={() => setFormData({ ...formData, method: type })}>

                    <input type="radio" name="method" className="form-check-input me-2" checked={formData.method === type} readOnly />
                    <label className="form-check-label fw-semibold">
                      {type === "cod" ? "Cash on Delivery" : type.toUpperCase()}
                    </label>

                  </div>
                ))}

                {formData.method === "card" && (
                  <div className="mt-3">

                    <input type="text" name="cardNumber" placeholder="Card Number" className="form-control" value={formData.cardNumber} onChange={handleChange} />
                    {errors.cardNumber && (
                      <small className="text-danger">{errors.cardNumber}</small>
                    )}

                    <input type="text" name="expiry" placeholder="MM/YY" className="form-control mt-2" value={formData.expiry} onChange={handleChange} />
                    {errors.expiry && (
                      <small className="text-danger">{errors.expiry}</small>
                    )}

                    <input type="text" name="cvv" placeholder="CVV" className="form-control mt-2" value={formData.cvv} onChange={(e) =>
                      setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, "") })
                    } />
                    {errors.cvv && (
                      <small className="text-danger">{errors.cvv}</small>
                    )}

                    <input type="text" name="cardName" placeholder="Name on Card" className="form-control mt-2" value={formData.cardName} onChange={handleChange} />
                    {errors.cardName && (
                      <small className="text-danger">{errors.cardName}</small>
                    )}

                  </div>
                )}

                {formData.method === "upi" && (
                  <div className="mt-3">
                    <input type="text" name="upiId" placeholder="example@upi" className="form-control" value={formData.upiId} onChange={handleChange} />
                    {errors.upiId && (
                      <small className="text-danger">{errors.upiId}</small>
                    )}
                  </div>
                )}

                {formData.method === "cod" && (
                  <div className="cod-msg mt-3">
                    You will pay at the time of delivery.
                  </div>
                )}

                <button className="btn btn-dark w-100 mt-4 py-3 fw-semibold rounded-3" onClick={handleSubmit}>
                  Place Order
                </button>

              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="border rounded-3 p-4 bg-light position-sticky" style={{ top: "20px" }}>

              {cart.map((item) => (
                <div className="d-flex gap-3">

                  <img src={`http://localhost:5000/upload/${item.productId.images[0]}`} alt="product" className="rounded img-fluid" style={{ maxHeight: "100px" }} />

                  <div className="flex-grow-1">

                    <div className="fw-semibold">
                      {item.productId.name}
                    </div>

                    <div className="fw-semibold mt-2">
                      ₹ {item.productId.price * item.qty}
                    </div>

                    <div className="text-muted small mt-2">
                      <span> Size: {item.size} </span>
                      <span className="text-muted ms-2 me-2">|</span>
                      <span className="text-muted">Qty: {item.qty}</span>
                    </div>

                    <hr />
                  </div>
                </div>
              ))}

              <div className="small">
                ({cart.length}) Items
              </div>

              <div className="d-flex justify-content-between small mt-2">
                <span>Sub Total</span>
                <span className="fw-semibold">₹ {subtotal}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-semibold mt-2">
                <span>Total Amount</span>
                <span>₹ {subtotal}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;
