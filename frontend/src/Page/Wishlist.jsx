import React, { useEffect, useState } from "react";
import Api from "../Services/Api";
import { useWishlist } from "../context/WishlistContext";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Wishlist() {
  const { wishlist, fetchWishlist, fetchWishlistProducts } = useWishlist();
  const [products, setProducts] = useState([]);

  useEffect(() => {
  const getProducts = async () => {
    if (!wishlist || wishlist.length === 0) {
      setProducts([]);
      return;
    }
    const prods = await fetchWishlistProducts();
    setProducts(prods || []);
  };
  getProducts();
}, [wishlist]);


  const remove_heart = async (productId) => {
    
    const token = localStorage.getItem("token");

    setProducts(prev => prev.filter(product => product._id !== productId));
    await Api.post('/wishlist-toggle', { productId },{
      headers: {
        Authorization: `Bearer ${token}`
      }})
    fetchWishlist();
  }

  useEffect(() => {
      AOS.init({
        once: true,
      });

      window.scrollTo(0,0)
    }, []);
  return (
    <div className="container my-5">
      <h4 className="text-center mb-4">My Wishlist</h4>

      <div className="row g-4">
        {products.map(product => (
          <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3" data-aos="zoom-in-right" data-aos-duration="2000">
            <div className="card wishlist-card h-100">

              <button className="wishlist-close" onClick={() => remove_heart(product._id)}>×</button>

              <div className="p-2">
                <img src={`http://localhost:5000/upload/${product.images[0]}`} className="img-fluid" alt={product.name} />
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
