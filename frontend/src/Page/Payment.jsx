import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Api from "../Services/Api"

const Payment = () => {
  const { cart, address, setCart, setAddress } = useCart();
  const [formData, setFormData] = useState({
    method: "razorpay",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
    const token = localStorage.getItem("token");

    if (formData.method === "cod") {
      try {
        await Api.post(
          "/placeorder",
          { shippingDetails: address, paymentMethod: "cod" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCart([]);
        setAddress(null);
        navigate("/orderconfirmation");
      } catch (error) {
        console.error(error);
        alert("Failed to place order");
      }
    } else if (formData.method === "razorpay") {
      try {
        
        const orderRes = await Api.post(
          "/create-razorpay-order",
          { amount: subtotal },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const options = {
          key: "rzp_test_SmTRoc5tWvhuxe",
          amount: orderRes.data.amount,
          currency: "INR",
          name: "QAROT",
          description: "Payment for Order",
          order_id: orderRes.data.id,
          handler: async function (response) {
            try {
              
              await Api.post(
                "/placeorder",
                { 
                  shippingDetails: address, 
                  paymentMethod: "razorpay",
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature
                },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              setCart([]);
              setAddress(null);
              navigate("/orderconfirmation");
            } catch (err) {
              console.error(err);
              alert("Payment successful but failed to save order. Please contact support.");
            }
          },
          prefill: {
            name: `${address.firstname} ${address.lastname}`,
            contact: address.mobile,
          },
          theme: {
            color: "#000",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } catch (error) {
        console.error(error);
        alert("Failed to initiate Razorpay payment");
      }
    }
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.productId.price * item.qty,
    0
  )

  return (
    <div className="bg-white">
      {}
      {}
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body p-4">
                <h5 className="mb-3">Payment Information</h5>
                {["razorpay", "cod"].map((type) => (
                  <div key={type} className={`border rounded-3 p-3 mb-2 d-flex align-items-center ${formData.method === type ? "border-dark bg-light" : "border-secondary"}`} style={{ cursor: "pointer" }} onClick={() => setFormData({ method: type })}>
                    <input type="radio" name="method" className="form-check-input me-2" checked={formData.method === type} readOnly />
                    <label className="form-check-label fw-semibold text-capitalize">
                      {type === "cod" ? "Cash on Delivery" : "Online Payment (Razorpay)"}
                    </label>
                  </div>
                ))}

                {formData.method === "cod" && (
                  <div className="mt-3 p-2 bg-warning bg-opacity-10 rounded border border-warning text-dark small">
                    <i className="bi bi-info-circle me-2"></i>
                    You will pay the amount in cash at the time of delivery.
                  </div>
                )}

                {formData.method === "razorpay" && (
                  <div className="mt-3 p-2 bg-primary bg-opacity-10 rounded border border-primary text-dark small">
                    <i className="bi bi-credit-card me-2"></i>
                    Pay securely using Razorpay (UPI, Card, NetBanking, etc.)
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

                  <img src={`upload/${item.productId.images[0]}`} alt="product" className="rounded img-fluid" style={{ maxHeight: "100px" }} />

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

