const CryptoJS = require("crypto-js");
const User = require("../models/User.model");


// update user data
module.exports.updateProfil = async (req, res) => {
  
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_ENC_TOK
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete user

module.exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Cet utilisateur a été bien supprimé...");
  } catch (error) {
    res.status(500).json(error);
  }
};

//----------------------------------------------------------------

// get one user
module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};


// get one user infos
module.exports.getUserInfos = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};

// get all users infos
module.exports.getAllUsersInfos = async (req, res) => {
  try {
    
    const users = await User.find().select('-password')
    res.json(users);

  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};






//------------------------------------------------------------------------


// get all users
module.exports.getAllUsers = async (req, res) => {
  const query = req.query.new;
 
  try {
    const users = query ? await User.find().sort({_id:-1}).limit(5) :await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};


// get user stats
module.exports.getUserStats = async (req, res) => {

    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1 ))
  try {
    const data = await User.aggregate([
        {$match: {createdAt : {$gte: lastYear}}},
        {
            $project:{
                month:{$month: "$createdAt"},
            }
        },

        {
            $group:{
                _id:"$month",
                total:{$sum: 1}
            }
        }
    ])
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

