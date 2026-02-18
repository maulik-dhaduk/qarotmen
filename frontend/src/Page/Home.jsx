import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from "../Services/Api"
import { useWishlist } from "../context/WishlistContext";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { wishlist, fetchWishlist } = useWishlist();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const location = useLocation()

  const navigate = useNavigate()
  useEffect(() => {
    apiCall()
    window.scrollTo(0,0)
  }, [])

  useEffect(() => {
    if (location.state?.loginSuccess) {
      setLoginSuccess(true);

      navigate(location.pathname, { replace: true });

      setTimeout(() => {
        setLoginSuccess(false);
        window.location.reload();
      }, 2000);
    }
  }, [location, navigate])

  useEffect(() => {
    if (location.state?.logoutSuccess) {
      setLogoutSuccess(true);

      navigate(location.pathname, { replace: true });

      setTimeout(() => {
        setLogoutSuccess(false);
        window.location.reload();
      }, 2000);
    }
  }, [location, navigate])

  const apiCall = async () => {
    const res = await Api.get("/products");
    setProducts(res.data);
  };

  const handleid = ((id) => {
    navigate(`/Product?id=${id}`)
  })

  const add_heart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      const loginBtn = document.querySelector(
        '[data-bs-target="#authModal"]'
      );
      loginBtn?.click();
      return;
    }
    await Api.post('/wishlist-toggle', { productId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    fetchWishlist();
  }

  const handleLinkClick = (categoryvalue) => {
    navigate(`/category/${categoryvalue}`)
  };

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <>
      {loginSuccess && (
        <h5 id="addMessage" className={loginSuccess ? "show bg-success text-white top-10" : ""}>
          Login Successfully!
        </h5>
      )}
      {logoutSuccess && (
        <h5 id="addMessage" className={logoutSuccess ? "show bg-success text-white top-10" : ""}>
          Logout Successfully!
        </h5>
      )}
      <div className="row g-0 m-0 text-center align-items-center" style={{ overflowX: "hidden" }}>
        <div className="col-lg-6 col-12 bg-danger text-white" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine" data-aos-duration="2000">
          <span className="fw-bold d-block special-offer">Special Offer!</span>
          <div className="d-flex justify-content-center gap-3 fs-5 flex-wrap">
            <div data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000"><span className="special-offer">Best</span><small className="special-offer">Choice</small></div>
            <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1050"><span className="special-offer">For</span><small className="special-offer">You</small></div>
            <div data-aos="fade-up" data-aos-delay="500" data-aos-duration="2000"><span className="special-offer">Shop</span><small className="special-offer">Now</small></div>
            <div data-aos="fade-up" data-aos-delay="600" data-aos-duration="2050"><span className="special-offer">Today</span><small className="special-offer">Only</small></div>
          </div>
        </div>

        <div className="col-lg-6 col-12" style={{ backgroundColor: "#fff6f7" }} data-aos="fade-left" data-aos-offset="300" data-aos-easing="ease-in-sine" data-aos-duration="2000">
          <span className="fs-5 d-block special-offer" data-aos="fade-down" data-aos-delay="400" data-aos-duration="1050">
            Enjoy amazing deals on our collection! 🎉
          </span>
          <div className="mt-1 special-offer" data-aos="fade-down" data-aos-delay="400" data-aos-duration="2000">
            Check out the latest offers in our store
            <Link to="/product" className="ms-2 text-dark text-decoration-underline">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-wrap="true">

        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 6"></button>
        </div>


        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="banner/untitled-1-83627223836205_l.jpg" className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="banner/3-83780030501823_l.jpg" className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="banner/2-83701814627543_l.jpg" className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="banner/4-83845133078946_l.jpg" className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="banner/qarot-banner-2-8639552431097_l.jpg" className="d-block w-100" alt="Slide 2" />
          </div>
        </div>


        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container-fluid">
        <div className="mt-5">
          <div className="row g-3">

            <div className="col-6 col-md-4 col-lg-3 text-center" data-aos="fade-up" data-aos-duration="2000">
              <a onClick={() => handleLinkClick("Ethnicwear")} style={{ cursor: "pointer" }}>
                <img src="category/4d3a9485-10581534189310_s.jpg" className="img-fluid" />
              </a>
              <a className="h5 d-block mt-3 text-decoration-none text-dark">
                Ethnicwear
              </a>
            </div>

            <div className="col-6 col-md-4 col-lg-3 text-center" data-aos="fade-up" data-aos-duration="2000">
              <a onClick={() => handleLinkClick("Festive 2026")} style={{ cursor: "pointer" }}>
                <img src="category/4d3a0001-257936735723838_s.jpg" className="img-fluid" />
              </a>
              <a className="h5 d-block mt-3 text-decoration-none text-dark">
                Festive 2026
              </a>
            </div>

            <div className="col-6 col-md-4 col-lg-3 text-center" data-aos="fade-up" data-aos-duration="2000">
              <a onClick={() => handleLinkClick("Pants")} style={{ cursor: "pointer" }}>
                <img src="category/dsc04199-10656478538095_s.jpg" className="img-fluid" />
              </a>
              <a className="h5 d-block mt-3 text-decoration-none text-dark">
                Bottomwear
              </a>
            </div>

            <div className="col-6 col-md-4 col-lg-3 text-center" data-aos="fade-up" data-aos-duration="2000">
              <a onClick={() => handleLinkClick("SUMMER 2026")} style={{ cursor: "pointer" }}>
                <img src="category/dsc00225-1-22073511411421_s.jpg" className="img-fluid" />
              </a>
              <a className="h5 d-block mt-3 text-decoration-none text-dark">
                SUMMER 2025
              </a>
            </div>

          </div>
        </div>

        <div className="mt-5">
          <div className="row g-3" data-aos="fade-up" data-aos-duration="2000">
            <h2 className="text-center">QAROT ESSENTIALS</h2>
            {products.filter(p => p.category?.includes("Ethnicwear")).map(p => (
              <div key={p._id} className="col-6 col-md-4 col-lg-3" data-aos="flip-left" data-aos-duration="2000">

                <div className="position-relative">
                  <img src={`upload/${p.images[0]}`} className="img-fluid" style={{ cursor: "pointer" }} alt="" onClick={() => handleid(p._id)} />
                  <h5 className="position-absolute top-0 end-0 p-2 py-1 mt-3 me-3 rounded-5" style={{ cursor: "pointer" }} onClick={() => add_heart(p._id)}>
                    <i className={wishlist.includes(p._id) ? "bi bi-heart-fill text-danger" : "bi bi-heart"}></i>
                  </h5>
                </div>

                <p className="mb-0 mt-1 product-name">{p.name}</p>
                <span className="text-dark fw-bold mt-1 mb-1">₹ {p.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="row g-3" data-aos="fade-up" data-aos-duration="3000">
            <h2 className="text-center">FESTIVE 2026</h2>
            {products.filter(p => p.category?.includes("Festive 2026")).map(p => (
              <div key={p._id} className="col-6 col-md-4 col-lg-3" data-aos="zoom-in" data-aos-duration="3000">

                <div className="position-relative">
                  <img src={`upload/${p.images[0]}`} className="img-fluid" style={{ cursor: "pointer" }} alt="" onClick={() => handleid(p._id)} />
                  <h5 className="position-absolute top-0 end-0 p-2 py-1 mt-3 me-3 rounded-5" style={{ cursor: "pointer" }} onClick={() => add_heart(p._id)}>
                    <i className={wishlist.includes(p._id) ? "bi bi-heart-fill text-danger" : "bi bi-heart"}></i>
                  </h5>
                </div>

                <p className="mb-0 mt-1 product-name">{p.name}</p>
                <span className="text-dark fw-bold mt-1 mb-1">₹ {p.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="row g-3" data-aos="fade-up" data-aos-duration="3000">
            <h2 className="text-center">SUMMER 2026</h2>
            {products.filter(p => p.category?.includes("SUMMER 2026")).map(p => (
              <div key={p._id} className="col-6 col-md-4 col-lg-3" data-aos="zoom-in" data-aos-duration="3000">

                <div className="position-relative">
                  <img src={`upload/${p.images[0]}`} className="img-fluid" style={{ cursor: "pointer" }} alt="" onClick={() => handleid(p._id)} />
                  <h5 className="position-absolute top-0 end-0 p-2 py-1 mt-3 me-3 rounded-5" style={{ cursor: "pointer" }} onClick={() => add_heart(p._id)}>
                    <i className={wishlist.includes(p._id) ? "bi bi-heart-fill text-danger" : "bi bi-heart"}></i>
                  </h5>
                </div>

                <p className="mb-0 mt-1 product-name">{p.name}</p>
                <span className="text-dark fw-bold mt-1 mb-1">₹ {p.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="row g-4">
            <div className="col-12 col-sm-6 col-lg-4" data-aos="fade-right" data-aos-duration="3000">
              <div className="card h-100 border-1">
                <img src="blog/image1.png" className="card-img-top img-fluid" alt="blog" />
                <div className="card-body">
                  <h6 className="card-title fw-bold">
                    The Timeless Appeal of Denim Jackets: Why You Need One in Your Wardrobe
                  </h6>
                  <p className="text-muted mb-2">January 27th, 2025</p>
                  <p className="card-text">
                    There’s something undeniably cool about denim jackets. From their rugged appeal to their versatile styling, denim jackets have cemented their place as a timeless wardrobe essential.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4" data-aos="fade-right" data-aos-duration="3000">
              <div className="card h-100 border-1">
                <img src="blog/image2.png" className="card-img-top img-fluid" alt="blog" />
                <div className="card-body">
                  <h6 className="card-title fw-bold">
                    The Timeless Appeal of Denim Jackets
                  </h6>
                  <p className="text-muted mb-2">July 20th, 2021</p>
                  <p className="card-text">
                    When it comes to the style of dressing, there are a variety of outfits men can wear which allow them to express their style as well as dress for the occasion.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4" data-aos="fade-right" data-aos-duration="3000">
              <div className="card h-100 border-1">
                <img src="blog/image3.png" className="card-img-top img-fluid" alt="blog" />
                <div className="card-body">
                  <h6 className="card-title fw-bold">
                    Stay Classy in a Classic Tuxedo
                  </h6>
                  <p className="text-muted mb-2">March 23rd, 2021</p>
                  <p className="card-text">
                    A Tuxedo is a ready to wear men’s suit which suits perfectly any men out there. It’s the most stylish blazer that men can buy online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}