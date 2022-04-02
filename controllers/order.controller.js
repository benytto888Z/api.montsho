const Order = require("../models/Order.model");

// create an order

module.exports.createOrder= async(req,res)=>{
 const newOrder = new Order(req.body);

 try {
 const savedOrder = await newOrder.save();
 res.status(200).json(savedOrder)
     
 } catch (error) {
     res.status(500).json(error)
 }

}

// update a cart

module.exports.updateOrder = async (req, res) => {
 
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete order

module.exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Le panier est vide...");
  } catch (error) {
    res.status(500).json(error);
  }
};


// get user orders
module.exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({userId: req.params.userId});
 
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};


// get all users orders
module.exports.getAllUsersOrders = async (req, res) => {
  try {
   const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};


// get monthly income
module.exports.getMonthlyIncome = async (req, res) => {
  
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
      
    const income = await Order.aggregate([
      {$match:{createdAt:{$gte:previousMonth},...(productId && {
        products:{$elemMatch:{productId}}
      })}},
      {
        $project:{
            month:{$month:"$createdAt"},
            sales:"$amount"
      }},
        {
          $group:{
            _id:"$month",
            total:{$sum: "$sales"},
          },
        },
    ]);
    
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
};




