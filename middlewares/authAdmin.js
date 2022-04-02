const User = require("../models/User.model");

const authAdmin = async (req,res,next)=>{
    try {
        const user = await User.findOne({_id: req.user.id})
        if(user.isAdmin === false){
            return  res.status(500).json({msg: "Il faut être admin pour accéder à cette ressource"});
           
        }
        next();

    } catch (error) {

         res.status(500).json({msg: error.message});
    }
}

module.exports = authAdmin