import React from "react";
import Api from "../Services/Api";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Cart = () => {

  const { wishlist, fetchWishlist } = useWishlist();
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const add_heart = async (productId) => {
    const token = localStorage.getItem("token");
    await Api.post('/wishlist-toggle', { productId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    fetchWishlist();
  }

  const handleRemove = async (id) => {
    await removeFromCart(id);
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.productId.price * item.qty,
    0
  );

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
                    <div className={`rounded-circle d-flex justify-content-center align-items-center mx-auto ${index === 0
                      ? "bg-primary text-white"
                      : "border bg-white"
                      }`}
                      style={{ width: "38px", height: "38px" }}>
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
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <img src="cart/empty.svg" />
              <h3 className="fw-light">Your cart</h3>
              <h5 className="fw-normal">Your cart is currently empty</h5>
              <button className="btn btn-dark  py-2 px-3 mt-2" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="col-12 col-lg-8">

                {cart.map((item) => {
                  const isInWishlist = wishlist.includes(item.productId._id);

                  return (
                    <div className="border rounded-3 p-3 mb-3" key={item._id}>
                      <div className="d-flex gap-3">
                        <img src={`http://localhost:5000/upload/${item.productId.images[0]}`} alt="product" className="rounded img-fluid" style={{ maxHeight: "160px" }} />

                        <div className="flex-grow-1">
                          <div className="fw-semibold">
                            {item.productId.name}
                          </div>

                          <div className="text-muted small mt-2">
                            Size: {item.size}
                          </div>

                          <div className="fw-semibold mt-2">
                            ₹ {item.productId.price * item.qty}
                          </div>

                          <div className="d-flex align-items-center gap-2 mt-3 flex-wrap small">
                            <span className="text-muted fw-semibold me-3">Qty: {item.qty}</span>
                            <span className="text-danger fw-semibold" role="button" onClick={() => handleRemove(item._id)}>
                              REMOVE
                            </span>


                            <span className="text-muted">|</span>

                            <span className={`fw-semibold ${isInWishlist ? "text-success" : "text-muted"} ${isInWishlist ? "" : "cursor-pointer"}`} role={!isInWishlist ? "button" : undefined} onClick={!isInWishlist ? () => add_heart(item.productId._id) : undefined} style={{ cursor: isInWishlist ? "default" : "pointer" }} >
                              {isInWishlist ? "ALREADY IN WISHLIST" : "MOVE TO WISHLIST"}
                            </span>


                          </div>
                        </div>
                      </div>
                    </div>

                  );
                })}

              </div>

              <div className="col-12 col-lg-4">
                <div className="border rounded-3 p-4 bg-light position-sticky" style={{ top: "20px" }}>

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

                  <button className="btn btn-dark w-100 mt-4" onClick={() => navigate("/address")}>
                    CONTINUE
                  </button>

                </div>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default Cart
