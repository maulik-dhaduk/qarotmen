import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import Api from "../Services/Api"
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Navbar() {

  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState(null);
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const inputref = useRef()

  const searchresult = () => {
    const searchvalue = inputref.current.value.trim();
    navigate(`/search?query=${searchvalue}`)
    inputref.current.value = "";

  }

  const handleLinkClick = (categoryvalue) => {
    navigate(`/category/${categoryvalue}`)
  };

  useEffect(() => {
    const links = document.querySelectorAll(
      '#mobileAccordion .nav-link[data-bs-toggle="collapse"]'
    );

    links.forEach((link) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      target.addEventListener("show.bs.collapse", () => {
        link.querySelector("i")?.classList.replace(
          "bi-chevron-down",
          "bi-chevron-up"
        );
      });

      target.addEventListener("hide.bs.collapse", () => {
        link.querySelector("i")?.classList.replace(
          "bi-chevron-up",
          "bi-chevron-down"
        );
      });
    });



    const token = localStorage.getItem("token");

    if (token) {
      Api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }




    const offcanvasEl = document.getElementById("mobileMenu");

    if (!offcanvasEl) return;

    offcanvasEl.addEventListener("hidden.bs.offcanvas", () => {
      document.body.classList.remove("modal-open");

      const backdrop = document.querySelector(".offcanvas-backdrop");
      if (backdrop) backdrop.remove();
    })


  }, []);

  useEffect(() => {
    AOS.init({
    });
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/", { state: { logoutSuccess: true } });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top bg-light" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="850">
        <div className="container-fluid px-4">
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link to="/" className="navbar-brand fw-semibold fs-4 fs-lg-3 logo ms-2 me-0  ms-lg-0">
            QAROT
          </Link>

          <div className="collapse navbar-collapse justify-content-center d-none d-lg-flex">
            <ul className="navbar-nav gap-4 fs-6">

              <li className="nav-item">
                <a className="nav-link text-dark" onClick={() => handleLinkClick("Ethnicwear")}>Ethnicwear</a>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-dark">
                  Collection Drops
                  <i className="bi bi-chevron-down down-up-space "></i>
                  <i className="bi bi-chevron-up down-up-space"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><a onClick={() => handleLinkClick("Festive 2026")} className="dropdown-item">Festive 2026</a></li>
                  <li><a onClick={() => handleLinkClick("SUMMER 2026")} className="dropdown-item">SUMMER 2026</a></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-dark">
                  Bottomwear
                  <i className="bi bi-chevron-down down-up-space"></i>
                  <i className="bi bi-chevron-up down-up-space"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><a onClick={() => handleLinkClick("Pants")} className="dropdown-item">Pants</a></li>
                  <li><a onClick={() => handleLinkClick("Shorts")} className="dropdown-item">Shorts</a></li>
                </ul>
              </li>


              <li className="nav-item">
                <a className="nav-link text-dark" onClick={() => handleLinkClick("Loungewear")}>Loungewear</a>
              </li>

            </ul>
          </div>

          <div className="d-flex align-items-center gap-3 fs-5 mt-2 mt-sm-0 m-auto m-sm-0">
            <div className="flex-grow-1 mx-2 nav-search" data-aos="fade-left" data-aos-easing="linear" data-aos-duration="850">
              <div className="position-relative">
                <input type="search" className="form-control rounded-pill ps-3 pe-5 w-100" name="search" ref={inputref} placeholder="Search" />
                <span className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted">
                  <i className="bi bi-search" onClick={searchresult} style={{ cursor: "pointer" }}></i>
                </span>
              </div>
            </div>

            <div className="d-flex gap-3 fs-5 fs-lg-6 align-items-center">
              <div className="position-relative d-inline-block" data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="850">
                <Link to="/wishlist" className="p-0 text-dark">
                  <i className="bi bi-heart fs-5"></i>
                </Link>

                {wishlist.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-black px-1 py-0">
                    {wishlist.length}
                  </span>
                )}
              </div>

              {user ? (
                <div className="dropdown user-dropdown">
                  <button className="btn border-0 nav-link fs-4 p-0" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-person"></i>
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end shadow">
                    <li className="dropdown-item-text fw-semibold">
                      {user.firstname} {user.lastname}
                    </li>
                    <li className="dropdown-item-text onluser">
                      <Link to="/order-detail" className="onluser link-underline-light  text-dark">My Order</Link>
                    </li>
                    <li>
                      <button className="dropdown-item text-dark onluser" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <button className="btn border-0 nav-link fs-4 p-0" data-bs-toggle="modal" data-bs-target="#authModal">
                  <i className="bi bi-person"></i>
                </button>
              )}

              <div className="position-relative d-inline-block" data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="850">
                <Link to="/cart" className="p-0 text-dark">
                  <i className="bi bi-bag fs-5"></i>
                </Link>

                {cart.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-black px-1 py-0">
                    {cart.length}
                  </span>
                )}
              </div>

            </div>
          </div>

        </div>
      </nav>

      <AuthModal showLogin={showLogin} setShowLogin={setShowLogin} />

      <div className="offcanvas offcanvas-start d-lg-none" id="mobileMenu">
        <div className="offcanvas-body">
          <ul className="navbar-nav fs-5" id="mobileAccordion">

            <li className="nav-item" data-aos="fade-right" data-aos-easing="linear" data-aos-duration="850">
              <a className="nav-link" data-bs-dismiss="offcanvas" onClick={() => handleLinkClick("Ethnicwear")}>
                Ethnicwear
              </a>
            </li>

            <li className="nav-item" data-aos="fade-right" data-aos-easing="linear" data-aos-duration="850">
              <a className="nav-link d-flex justify-content-between align-items-center"
                data-bs-toggle="collapse" href="#m-shop">
                Collection Drops
                <i className="bi bi-chevron-down"></i>
              </a>
              <div className="collapse" id="m-shop" data-bs-parent="#mobileAccordion">
                <ul className="navbar-nav ps-3 fs-6">
                  <li><a className="nav-link" data-bs-dismiss="offcanvas"
                    onClick={() => handleLinkClick("Festive 2026")}>Festive 2026</a></li>
                  <li><a className="nav-link" data-bs-dismiss="offcanvas"
                    onClick={() => handleLinkClick("SUMMER 2026")}>SUMMER 2026</a></li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link d-flex justify-content-between align-items-center"
                data-bs-toggle="collapse" href="#m-top">
                Bottomwear
                <i className="bi bi-chevron-down"></i>
              </a>
              <div className="collapse" id="m-top" data-bs-parent="#mobileAccordion">
                <ul className="navbar-nav ps-3 fs-6">
                  <li><a className="nav-link" onClick={() => handleLinkClick("Pants")}>Pants</a></li>
                  <li><a className="nav-link" onClick={() => handleLinkClick("Shorts")}>Shorts</a></li>
                </ul>
              </div>
            </li>

            <li className="nav-item" data-aos="fade-right" data-aos-easing="linear" data-aos-duration="850">
              <a className="nav-link" data-bs-dismiss="offcanvas" onClick={() => handleLinkClick("Loungewear")}>
                Loungewear
              </a>
            </li>

          </ul>
        </div>
      </div>
    </>
  );
}