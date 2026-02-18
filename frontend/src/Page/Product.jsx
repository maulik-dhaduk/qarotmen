import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Api from "../Services/Api"
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Product() {
  const [size, setSize] = useState("S");
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const id = searchParams.get("id");
  const { wishlist, fetchWishlist } = useWishlist();
  const [count, setcount] = useState(1)
  const [message, setmessage] = useState()
  const [showMessage, setShowMessage] = useState(false);
  const { addToCart } = useCart();


  const getProduct = async () => {
    try {
      const res = await Api.get(`/findproduct?id=${id}`);
      setProduct(res.data);
    } catch (error) {
      alert(error);
    }
  }

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

  const increment = () => {
    setcount(count + 1)
  }

  const decrement = () => {
    if (count > 1) {
      setcount(count - 1);
    }
  };


  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      const loginBtn = document.querySelector(
        '[data-bs-target="#authModal"]'
      );
      loginBtn?.click();
      return;
    }
    const cartData = {
      productId: product._id,
      size: size,
      qty: count
    };

    await addToCart(cartData);

    setmessage("Added to cart successfully!");
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    AOS.init({
      once: true,
    });
    window.scrollTo(0,0)
  }, []);

  if (!product) return <h3 className="text-center mt-5">Product not found</h3>;

  return (
    <div className="container my-5 overflow-hidden">
      {message && (
        <h5 id="addMessage" className={showMessage ? "show bg-success text-white top-10" : ""}>
          {message}
        </h5>
      )}
      <div className="row g-5">
        <div className="col-lg-6" data-aos="fade-right" data-aos-duration="2000">
          <div className="row g-3">
            <div className="col-3 d-flex flex-column gap-2 thumb-all d-none d-sm-block" data-aos="fade-up">
              {product.images.map((img, index) => (
                <img key={index} src={`upload/${img}`} className={`mb-2 thumb-img img-fluid ${mainImage === img ? "selected" : ""}`} onClick={() => setMainImage(img)} alt=""
                />
              ))}
            </div>


            <div className="col-9 main_img_all d-none d-sm-block" data-aos="zoom-in">
              <div className="m-5 mt-0">
                <img src={`upload/${mainImage}`} className="main-img img-fluid" alt="" />
              </div>
            </div>

            <div className="d-block d-sm-none" data-aos="fade-up" data-aos-duration="2000">
              <div id="productCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-indicators">
                  {product.images.map((_, index) => (
                    <button key={index} type="button" data-bs-target="#productCarousel" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current={index === 0 ? "true" : undefined} aria-label={`Slide ${index + 1}`} />
                  ))}
                </div>


                <div className="carousel-inner">
                  {product.images.map((imgUrl, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                      <img src={`upload/${imgUrl}`} className="d-block w-100" alt={`Slide ${index}`} />
                    </div>
                  ))}
                </div>


                <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                  <i className="bi bi-chevron-left fs-1 text-black"></i>
                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                  <i className="bi bi-chevron-right fs-1 text-black"></i>
                </button>

              </div>
            </div>

          </div>
        </div>

        <div className="col-lg-6" data-aos="fade-left" data-aos-duration="2000">
          <h1 className="fw-normal mb-2">{product.name}</h1>
          <p className="text-muted">SKU: K128Gn</p>

          <h4 className="fw-semibold">₹ {product.price}</h4>
          <p className="text-muted small">(Inclusive of all taxes)</p>

          <p className="small lh-lg">
            {product.description}
          </p>

          <p className="small fw-semibold">Country of Origin: India</p>

          <div className="mb-3">
            <label className="form-label fw-semibold">Size:</label>
            <select className="form-select w-50" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="S" selected>S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold d-block">Quantity:</label>

            <div className="d-inline-flex align-items-center border rounded-2 overflow-hidden">
              <button className="btn border-0 px-3 bg-transparent" onClick={decrement}>-</button>
              <span className="px-3 fw-medium">{count}</span>
              <button className="btn border-0 px-3 bg-transparent" onClick={increment}>+</button>
            </div>
          </div>

          <div className="d-flex gap-3 align-items-center mb-4">
            <button className="btn btn-dark  py-2 px-5" onClick={handleAddToCart}>
              Add To Cart
            </button>

            <button className="btn border border-danger text-danger px-3 py-2" onClick={() => add_heart(product._id)}>
              <i className={wishlist.includes(product._id) ? "bi bi-heart-fill text-danger" : "bi bi-heart"}></i>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
