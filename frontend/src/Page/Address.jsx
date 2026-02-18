import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Address = () => {
    const { cart, address, setAddress } = useCart();
    const navigate = useNavigate();
    const [form, setForm] = useState(address || {});
    const [errors, setErrors] = useState({});

    const subtotal = cart.reduce(
        (total, item) => total + item.productId.price * item.qty,
        0
    );

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validate = () => {
        let errs = {};

        if (!form.firstname) {
            errs.firstname = "First name is required";
        }

        if (!form.lastname) {
            errs.lastname = "Last name is required";
        }

        if (!form.mobile) {
            errs.mobile = "Mobile number is required";
        } else if (!/^[0-9]{10}$/.test(form.mobile)) {
            errs.mobile = "Enter valid 10 digit mobile number";
        }

        if (!form.address) {
            errs.address = "Address is required";
        }

        if (!form.postalcode) {
            errs.postalcode = "Postal code is required";
        }

        if (!form.state) {
            errs.state = "Please select state";
        }

        if (!form.city) {
            errs.city = "City is required";
        }

        if (!form.terms) {
            errs.terms = "You must accept Terms & Conditions";
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        setAddress(form);
        navigate("/payment");
    };

    useEffect(() => {
        setForm(address || {});
    }, [address]);

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
                                        <div className={`rounded-circle d-flex justify-content-center align-items-center mx-auto ${index === 0 ? "bg-success text-white" : index === 1 ? "bg-primary text-white" : "border bg-white"
                                            }`} style={{ width: "38px", height: "38px" }}>
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
                        <h5 className="fw-semibold mb-4">Shipping Details</h5>

                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <input name="firstname" className="form-control p-2 border-dark shadow-none" placeholder="First Name" value={form.firstname || ""} onChange={handleChange} />
                                {errors.firstname && (<small className="text-danger">{errors.firstname}</small>)}
                            </div>

                            <div className="col-12 col-md-6">
                                <input name="lastname" className="form-control p-2 border-dark shadow-none" placeholder="Last Name" value={form.lastname || ""} onChange={handleChange} />
                                {errors.lastname && (<small className="text-danger">{errors.lastname}</small>)}
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className="input-group">
                                <input name="mobile" className="form-control p-2 border-dark shadow-none" placeholder="Mobile" value={form.mobile || ""} onChange={handleChange} />
                            </div>
                            {errors.mobile && (<small className="text-danger">{errors.mobile}</small>)}
                        </div>

                        <div className="row g-3 mt-1">
                            <div className="col-12 col-md-8">
                                <input name="address" className="form-control p-2 border-dark shadow-none" placeholder="Address (Villa/Apt#, Building Name & Street)" value={form.address || ""} onChange={handleChange} />
                                {errors.address && (<small className="text-danger">{errors.address}</small>)}
                            </div>

                            <div className="col-12 col-md-4">
                                <input name="postalcode" className="form-control p-2 border-dark shadow-none" placeholder="Postal Code" value={form.postalcode || ""} onChange={handleChange} />
                                {errors.postalcode && (<small className="text-danger">{errors.postalcode}</small>)}
                            </div>
                        </div>

                        <div className="row g-3 mt-1">
                            <div className="col-12 col-md-4">
                                <input className="form-control p-2 border-dark shadow-none" value="India" disabled />
                            </div>

                            <div className="col-12 col-md-4">
                                <select name="state" className="form-select p-2 border-dark shadow-none" value={form.state || ""} onChange={handleChange}>
                                    <option value="">Select State</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                </select>
                                {errors.state && (<small className="text-danger">{errors.state}</small>)}
                            </div>

                            <div className="col-12 col-md-4">
                                <input name="city" className="form-control p-2 border-dark shadow-none" placeholder="City" value={form.city || ""} onChange={handleChange} />
                                {errors.city && (<small className="text-danger">{errors.city}</small>)}
                            </div>
                        </div>

                        <div className="form-check mt-2">
                            <input className="form-check-input" type="checkbox" id="terms" name="terms" checked={form.terms || false} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="terms">
                                I have read and agree to the Terms & Conditions
                            </label>
                            {errors.terms && (
                                <div><small className="text-danger">{errors.terms}</small></div>
                            )}
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-5 flex-column flex-md-row gap-3 mb-5 mb-sm-5 mb-lg-0">

                            <span className="text-muted" role="button" onClick={() => navigate("/cart")}>
                                ← Return to cart
                            </span>

                            <button className="btn btn-dark px-5 py-3 rounded-3 " onClick={handleSubmit}>
                                Continue to shipping
                            </button>

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

export default Address;
