const jwt = require("jsonwebtoken");


const verifyToken = (req,res,next)=>{
    console.log("waaaaaaaaaaaaaaaaaaaa")
    try {
        console.log("header",req.headers)
        const token = req.header("Authorization")
        console.log("user access token",token)
        if(!token) return res.status(400).json({msg: "Le Token ne correspond pas"});

       /* jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) return res.status(401).json({msg:"Token non valide"});
            req.user = user;
          //  console.log(user)
            next();
        })*/

      const user = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
     );

     console.log(user)
   
     if(user.id){
      req.user = user;
       next();
    }else{
        return res.status(401).json({msg:"Token non valide"});
    }
        
    } catch (error) {
          return res.status(500).json({msg: error.message});
    }
}


module.exports = verifyToken;
/*
const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token
    console.log(authHeader);
    if(authHeader){
        const usertoken = authHeader.split(" ")[1];
        console.log(usertoken);
        jwt.verify(usertoken,process.env.TOKEN_SECRET,(err,user)=>{
            if(err) res.status(401).json("Token non valide");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("Vous n'êtes pas authentifié");
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
          if(req.user.id === req.params.id || req.user.isAdmin){
                next();
          }else{
              res.status(403).json("Vous n'êtes pas authorisé à faire cette action")
          }
    })
}

const verifyTokenAndAdmin= (req,res,next)=>{
 
    verifyToken(req,res,()=>{
           console.log(req.user);
          if(req.user.isAdmin){
                next();
          }else{
              res.status(403).json("Vous n'êtes pas authorisé à faire cette action")
          }
    })
}

module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};*/



