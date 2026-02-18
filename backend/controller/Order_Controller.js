const Order_model = require("../model/Order_Model");
const Cart_model = require("../model/Cart_Model");

const placeOrder = async (req, res) => {
  try {
    const { shippingDetails, paymentMethod } = req.body;
    const userId = req.user.id;

    const cartItems = await Cart_model.find({ userId }).populate("productId");
    if (cartItems.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const totalAmount = cartItems.reduce((sum, item) => sum + item.productId.price * item.qty, 0);

    const products = cartItems.map(item => ({
      productId: item.productId._id,
      qty: item.qty,
      size: item.size,
      price: item.productId.price
    }));

    const orderNo = Math.floor(100000 + Math.random() * 900000).toString();

    const order = await Order_model.create({
      orderNo,
      userId,
      shippingDetails,
      paymentMethod,
      products,
      totalAmount
    });

    await Cart_model.deleteMany({ userId });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place order" });
  }
}

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order_model
      .find({ userId })
      .sort({ orderDate: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order_model.findById(id).populate("products.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
}

module.exports = {placeOrder,getUserOrders,getSingleOrder}
