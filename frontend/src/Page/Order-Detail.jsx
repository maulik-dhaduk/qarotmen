import React, { useEffect, useState } from "react";
import Api from "../Services/Api"
import { useNavigate } from "react-router-dom";

const Order_Detail = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
    window.scrollTo(0,0)
  }, []);
  

  const fetchOrders = async () => {
    try {

      const token = localStorage.getItem("token");
      const res = await Api.get("/myorders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
    <div className="w-100" style={{ maxWidth: "800px" }}>
      <h3 className="mb-4 text-center">My Orders</h3>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order No.</th>
              <th>Order Date</th>
              <th>Amount</th>
              <th>Delivery Status</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderNo}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>₹ {order.totalAmount}</td>
                  <td>
                    <span className="badge bg-warning text-dark">Pending</span>
                  </td>
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => navigate(`/order-view/${order._id}`)}>
                        View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Order_Detail
