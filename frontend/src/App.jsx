import { Route, Routes } from "react-router-dom"
import Layout from "./Component/Layout"
import Home from "./Page/Home"
import Product from "./Page/Product"
import "./global.css";
import Wishlist from "./Page/Wishlist";
import Cart from "./Page/Cart";
import Search from "./Page/Search";
import Category from "./Page/Category";
import Address from "./Page/Address";
import Payment from "./Page/Payment";
import OrderConfirmation from "./Page/OrderConfirmation";
import Order_Detail from "./Page/Order-Detail";
import Order_View from "./Page/Order_View";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/product" element={<Product/>}></Route>
          <Route path="/wishlist" element={<Wishlist/>}></Route>
          <Route path="/search" element={<Search/>}></Route>
          <Route path="/category/:categoryvalue" element={<Category/>}></Route>
          <Route path="/order-detail" element={<Order_Detail/>}></Route>
          <Route path="/order-view/:id" element={<Order_View/>} />
        </Route>
          <Route path="/address" element={<Address/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/payment" element={<Payment/>}></Route>
          <Route path="/orderconfirmation" element={<OrderConfirmation/>}></Route>
      </Routes>
    </>
  )
}

export default App
