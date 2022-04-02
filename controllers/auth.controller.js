const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser)
const User = require("../models/User.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const sendEMail = require("./sendMail");
const CLIENT_URL = process.env.CLIENT_URL;
let maxAge = 3 * 24 * 60 * 60 * 1000;

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "60m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "60m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};



// REGISTER

module.exports.signUp = async (req, res) => {
  try {
   
    const {
      firstname,
      lastname,
      email,
      phone,
      address,
      postcode,
      city,
      country,
      password,
      repeatPassword
    } = req.body;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !postcode ||
      !city ||
      !country ||
      !password ||
      !repeatPassword
    )
      return res.status(400).json({ msg: "Veuillez remplir tous les champs." });

      if (password !== repeatPassword)
      return res.status(400).json({ msg: "Les deux mots de passent ne concordent pas" });

    if (!validateEmail(email))
      return res.status(400).json({ msg: "Le format d'email est invalide." });

    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ msg: "L'utilisateur avec cet email existe déjà" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Le mot de passe doit faire au moins 6 caractères." });

    const passwordHash = await CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_ENC_TOK
    ).toString();
    const newUser = {
      firstname,
      lastname,
      email,
      phone,
      address,
      postcode,
      city,
      country,
      password: passwordHash,
    };

    const activation_token = createActivationToken(newUser);
   
    const url = `${CLIENT_URL}/api/auth/activation/${activation_token}`;
    
    sendEMail(email, url,"Vérifier votre addresse email","Vérifier email");

    res.json({
      msg: "Inscription prise en compte ! Veuillez activer votre compte en cliquant sur le lien envoyé par mail ",
    });

    //  const savedUser = await newUser.save();
    //  res.status(201).json(savedUser)
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// activate email

module.exports.activateEmail = async (req, res) => {
  
  try {
    const { activation_token } = req.body;

    const user = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );
     

    const {
      firstname,
      lastname,
      email,
      phone,
      address,
      postcode,
      city,
      country,
      password,
    } = user;

    const check = await User.findOne({ email });
    if (check)
      return res
        .status(400)
        .json({ msg: "Utilisateur actif : Token déjà utilisé. Veuillez vous connecter." });

    const newUser = new User({
      firstname,
      lastname,
      email,
      phone,
      address,
      postcode,
      city,
      country,
      password,
    });

    await newUser.save();
   return res
        .status(200)
        .json({ msg: "Votre Compte est activé . Vous pouvez vous connecter" });
  } catch (error) {
    res.status(500).json({msg:error.message});
  }
};
// Login

module.exports.signIn = async (req, res) => {
  try {
    const { email, passwd } = req.body;
    if(email.trim()=="" || passwd.trim()=="") return res.status(401).json({msg:"Vous devez remplir tous les champs"});
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({msg:"Cet utilisateur n'existe pas"});
   
    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_ENC_TOK
    );
    const userpassword = hashPassword.toString(CryptoJS.enc.Utf8);

    if (userpassword !== passwd){
        
       return res.status(401).json({msg:"Le mot de passe est incorrect"});
    }
     

    const refreshtoken = createRefreshToken({ id: user._id,isAdmin: user.isAdmin});
    

    res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path:'/api/auth/refreshtoken',
                maxAge
    });
    
        // const {password,...others} = user;
         const {password,...others} = user._doc;
         res.status(200).json({...others,refreshtoken});

  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }

};


// getAccessToken

module.exports.getAccessToken = (req, res) => {
  
 try {

   
      const rf_token = req.cookies.refreshtoken
      
      if (!rf_token)  res.status(400).json("Veuillez vous connecter d'abord ! ");

    const user = jwt.verify(
      rf_token,
      process.env.REFRESH_TOKEN_SECRET
    );

  

    if(user.id){
      
       const access_token = createAccessToken({id: user.id,isAdmin:user.isAdmin})
       
      return res.status(201).json({access_token})
    }
  } catch (error) {
    return res.status(500).json({ msg: "error.message" });
  }
};

// forget password update

module.exports.forgotPassword = async (req,res) =>{

    try {

        const {useremail} = req.body

        const user =  await User.findOne({email : useremail})
      
        if(user == null){
            return res.status(201).json({ msg: "Cet email n'existe pas " });
        } 

        const access_token = createAccessToken({id:user._id,isAdmin:user.isAdmin})
        const url = `${CLIENT_URL}/api/auth/resetpass/${access_token}`

        sendEMail(useremail, url,"Mettre à jour votre mot de passe","Obtenir un nouveau mot de passe");
        return res.status(201).json({ msg: "Changement de mot de passe , vérifier votre email" });
        
    } catch (error) {
         return res.status(500).json({ msg: error.message });
    }
}


// resetPassword

module.exports.resetPassword = async(req,res)=>{
    
    try {
       
    const {password} = req.body;
        
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Le mot de passe doit faire au moins 6 caractères." });

    const passwordHash = await CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_ENC_TOK
    ).toString();
  

    await User.findOneAndUpdate({_id:req.user.id},{
        password:passwordHash
    })
    res.json({msg:"Mot de passe modifié avec succès"})
    
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}


// update user infos
module.exports.updateUserInfos = async (req, res) => {
 
   if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_ENC_TOK
    ).toString();
  }else{
    const {password,...others} = req.body
    req.body = others;
  }

 

  try {
    
    //const {email,phone,address,postcode,city,country,img} = req.body
    await User.findOneAndUpdate({_id: req.user.id},{
      ...req.body
    }).then(r =>{
      req.body.firstname = r.firstname;
      req.body.lastname = r.lastname;
      req.body.email = r.email;
      // req.body.img = r.img;
      res.userinfos = req.body;
       
    })

     res.status(200).json({msg: "Profil mise à jour avec succèsss" , body: res.userinfos});
  

  } catch (error) {
    
    res.status(500).json({msg: error.message});
  }
};
// update all users infos
module.exports.updateUsersRole = async (req, res) => {
  
  try {
      const {isAdmin} = req.body
     
    await User.findOneAndUpdate({_id: req.params.id},{
      isAdmin
    })

   return res.status(200).json({msg: "Role modifié avec succès"});

  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};




// logout



module.exports.logout= async (req,res)=>{

  try {
    
     res.clearCookie('refreshtoken', { path: "/api/auth/refreshtoken"})
     return res.json({msg:"Vous vous êtes déconnecté avec success"})
  } catch (error) {
     return res.status(500).json({ msg: error.message });
  }
}



