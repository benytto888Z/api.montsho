const User = require("../models/User.model");

const userCtrl = {
    register:async(req,res)=>{
        try {
            const {firstname,lastname,email,phone,address,postcode,city,country,password} = req.body
            if(!firstname || !lastname || !email || !phone || !postcode || !city || !country || !password)
                return res.status(400).json({msg: "Veuillez remplir tous les champs."})

            if(!validateEmail(email))
                return res.status(400).json({msg: "Veuillez remplir tous les champs."})

            res.json({msg:"Register Test"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports = userCtrl;