import { createContext, useContext, useEffect, useState } from "react";
import Api from "../Services/Api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setWishlist([]);
        return;
      }
      const res = await Api.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (Array.isArray(res.data)) {
        const ids = res.data.map(item => item.productId._id);
        setWishlist(ids);
      } else {
        setWishlist([]);
      }

    } catch (error) {
      console.error("Wishlist fetch error", error);
      setWishlist([]);
    }
  };
  const fetchWishlistProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found, returning empty wishlist products");
        return [];
      }

      const res = await Api.get("/wishlist", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (Array.isArray(res.data)) {
        const products = res.data.map(item => item.productId);
        return products;
      } else {
        console.error("Expected an array but got:", res.data);
        return [];
      }

    } catch (error) {
      console.error("Fetch wishlist products error", error);
      return [];
    }
  };



  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, fetchWishlist, fetchWishlistProducts }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext);
