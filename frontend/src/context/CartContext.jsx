import { createContext, useContext, useEffect, useState } from "react";
import Api from "../Services/Api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(null);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCart([]);
        return;
      }
      
      const res = await Api.get("/cartshow", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCart(res.data);
    } catch (error) {
      console.error("Cart fetch error", error);
    }
  };


  const addToCart = async (cartData) => {
    try {
      const token = localStorage.getItem("token");

      await Api.post("/cart", cartData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchCart();
    } catch (error) {
      console.error("Add cart error", error);
    }
  };


  const removeFromCart = async (id) => {
    const token = localStorage.getItem("token");

    await Api.delete(`/cartdelete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, fetchCart, addToCart, removeFromCart, address, setAddress }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
