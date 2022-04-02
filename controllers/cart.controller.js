const Cart = require("../models/Cart.model");



// create a cart

module.exports.createCart= async(req,res)=>{
 const newCart = new Cart(req.body);

 try {
 const savedCart = await newCart.save();
 res.status(200).json(savedCart)
     
 } catch (error) {
     res.status(500).json(error)
 }

}

// update a cart

module.exports.updateCart = async (req, res) => {
 
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete cart

module.exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Le panier est vide...");
  } catch (error) {
    res.status(500).json(error);
  }
};


// get user cart
module.exports.getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.params.userId});
 
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};


// get all carts from all users
module.exports.getAllUsersCarts = async (req, res) => {
  try {
   const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
};
