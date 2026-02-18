const Cart_model = require("../model/Cart_Model");

const add_or_update_cart = async (req, res) => {
  try {
    const { productId, size, qty } = req.body;

    const updatedCart = await Cart_model.findOneAndUpdate(
      { productId, size, userId: req.user.id },
      {
        $inc: { qty: qty }
      },
      {
        new: true,
        upsert: true
      }
    );

    res.status(200).json(updatedCart);

  } catch (error) {
    res.status(500).json({ message: "Failed to add/update cart" });
  }
};

const ShowCart = async (req, res) => {
  try {
    const data = await Cart_model.find({ userId: req.user.id }).populate("productId");
    res.json(data);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};


const Delete_Cart = async (req, res) => {
  try {
    await Cart_model.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete" });
  }
};

module.exports = {add_or_update_cart,ShowCart,Delete_Cart}
