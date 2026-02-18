import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../Services/Api";

const Order_View = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await Api.get(`/order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrder(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!order) return <div className="text-center mt-5">Loading...</div>;

  return (
  <div className="container my-5">
    <div className="card shadow-lg border-0">
      
      <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Order Details</h5>
        <span className="badge bg-warning text-dark">
          Order No: {order.orderNo}
        </span>
      </div>

      <div className="card-body">

        <div className="row mb-4">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3 border-bottom pb-2">Order Information</h6>
            <p className="fw-light">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            <p className="fw-light">Payment Method: {order.paymentMethod}</p>
          </div>

          <div className="col-md-6">
            <h6 className="fw-bold mb-3 border-bottom pb-2">Customer Details</h6>
            <p className="fw-light">Name: {order.shippingDetails.firstname} {order.shippingDetails.lastname}</p>
            <p className="fw-light">Phone: {order.shippingDetails.mobile}</p>
          </div>
        </div>

        <div className="mb-4">
          <h6 className="fw-bold mb-3 border-bottom pb-2">Billing Address</h6>
          <div className="bg-light p-3 rounded">
            <p className="mb-1">{order.shippingDetails.address}</p>
            <p className="mb-1">
              {order.shippingDetails.city}, {order.shippingDetails.state}
            </p>
            <p className="mb-0">India</p>
          </div>
        </div>

        <div className="table-responsive mb-4">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Item Name</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((item, index) => (
                <tr key={index}>
                  <td style={{ width: "120px" }}>
                    <img src={`http://localhost:5000/upload/${item.productId.images[0]}`} alt="product" className="img-fluid rounded" style={{ height: "120px", objectFit: "cover" }}/>
                  </td>
                  <td>{item.productId.name}</td>
                  <td>{item.size}</td>
                  <td>{item.qty}</td>
                  <td className="fw-bold text-success">
                    ₹ {item.price * item.qty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row justify-content-end">
          <div className="col-md-4">
            <div className="card border-1 shadow-sm">
              <div className="card-body">
                <h6 className="fw-bold mb-3 border-bottom pb-2">Order Summary</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>₹ {order.totalAmount}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span>₹ {order.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);

};

export default Order_View;
