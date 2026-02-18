import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-light mt-5 pt-5 w-100">
            <div className="container-fluid px-3 px-md-5">
                <div className="text-center mb-5">
                    <h5>Download Our App</h5>
                    <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
                        <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" height="50" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" height="50" />
                    </div>
                    <hr className="mt-4" />
                </div>

                <div className="row gy-4 text-center text-md-start">

                    <div className="col-6 col-md-3">
                        <h6 className="fw-bold">Information</h6>
                        <ul className="list-unstyled small">
                            <li className="mb-2 cursor-pointer text-decoration-hover">About Us</li>
                            <li className="mb-2">Qarot Men Reward Points</li>
                            <li className="mb-2">Product Care</li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-3">
                        <h6 className="fw-bold">Our Company</h6>
                        <ul className="list-unstyled small">
                            <li className="mb-2">Blog</li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-3">
                        <h6 className="fw-bold">Customer Service</h6>
                        <ul className="list-unstyled small">
                            <li className="mb-2">Contact</li>
                            <li className="mb-2">Shipping Policy</li>
                            <li className="mb-2">Return / Refund / Cancellation Policy</li>
                            <li className="mb-2">Track Order</li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-3">
                        <h6 className="fw-bold">Contact Us</h6>
                        <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
                            <i className="bi bi-facebook fs-5"></i>
                            <i className="bi bi-instagram fs-5"></i>
                            <i className="bi bi-snapchat fs-5"></i>
                            <i className="bi bi-twitter-x fs-5"></i>
                        </div>
                    </div>

                </div>

                <hr className="my-4" />

                <p className="text-center small text-muted mb-0 pb-3">© 2026 All Rights Reserved</p>

            </div>
        </footer>
    )
}
