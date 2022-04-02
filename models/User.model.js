const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstname:{type:String,required:[true,"Entrez le prénom"], trim:true},
        lastname:{type:String,required:true},
        email:{type:String,required:[true,"Entrez l'email"], trim:true,unique:true},
        phone:{type:String,required:true},
        address:{type:String,required:true},
        postcode:{type:Number,required:true},
        city:{type:String,required:true},
        country:{type:String,required:true},
        password:{type:String,required:[true,"Entrez le mot de passe"]},
        isAdmin:{
            type:Boolean,
            default:false,
        },
        img:{type:String,default:"https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},
    },
    {timestamps:true}
);

module.exports = mongoose.model("User",UserSchema);