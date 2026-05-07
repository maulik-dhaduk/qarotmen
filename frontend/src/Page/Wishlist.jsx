import React, { useEffect, useState } from "react";
import Api from "../Services/Api";
import { useWishlist } from "../context/WishlistContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, fetchWishlist, fetchWishlistProducts, toggleWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const navigate = useNavigate();

  const handleid = ((id) => {
    navigate(`/Product?id=${id}`)
  })

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (!hasLoadedOnce) setLoading(true);
        if (!wishlist || wishlist.length === 0) {
          setProducts([]);
          return;
        }


        const currentProductIds = products.map(p => p._id).sort().join(",");
        const wishlistIds = [...wishlist].sort().join(",");

        if (!hasLoadedOnce || currentProductIds !== wishlistIds) {
          const prods = await fetchWishlistProducts();
          setProducts(prods || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setHasLoadedOnce(true);
      }
    };
    getProducts();
  }, [wishlist]);

  const remove_heart = async (productId) => {


    setProducts(prev => prev.filter(product => product._id !== productId));
    await toggleWishlist(productId);
  };

  useEffect(() => {
    AOS.init({
      once: true,
    });
    window.scrollTo(0, 0);
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );


  if (products.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h4 className="mb-4">My Wishlist</h4>
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '50vh', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
          <i className="bi bi-heart-fill text-danger mb-3" style={{ fontSize: '5rem', opacity: 0.7 }}></i>
          <h5 className="text-dark fw-bold">Your Wishlist is Empty</h5>
          <p className="text-muted mb-4">Looks like you haven't added anything to your wishlist yet.</p>
          <button className="btn btn-dark px-4 py-2" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h4 className="text-center mb-4">My Wishlist</h4>

      <div className="row g-4">
        {products.map(product => (
          <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3" data-aos="zoom-in-right" data-aos-duration="2000">
            <div className="card wishlist-card h-100">

              <button className="wishlist-close" onClick={() => remove_heart(product._id)}>×</button>

              <div className="p-2">
                <img src={`upload/${product.images[0]}`} className="img-fluid" style={{ cursor: "pointer" }} alt={product.name} onClick={() => handleid(product._id)} />
              </div>

              <div className="text-center px-2 pb-3">
                <p className="mb-1 small">{product.name}</p>
                <p className="fw-bold mb-0">₹ {product.price}</p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

