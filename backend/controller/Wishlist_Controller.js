const Wishlist_model = require("../model/Wishlist_Model")

const toggleWishlist = async (req, res) => {
    const { productId } = req.body
    const userId = req.user.id;

    const exists = await Wishlist_model.findOne({ productId, userId })

    if (exists) {
        await Wishlist_model.deleteOne({ productId, userId })
        return res.json({ wishlisted: false })
    }

    await Wishlist_model.create({ productId, userId })
    res.json({ wishlisted: true })
}

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await Wishlist_model.find({ userId }).populate("productId");
    res.json(data);

  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = { toggleWishlist, getWishlist }