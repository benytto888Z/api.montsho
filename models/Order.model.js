const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId:{type:String,required:true},
        products:[
            {
                productId:{
                    type:String
                },
                productName:{
                     type:String
                },
                quantity:{
                    type: Number,
                    default:1
                },
                size:{
                    type: String,
                    default:null
                },
                color:{
                    type: String,
                    default:null
                },

                fabric:{
                    type: String,
                    default:null
                },
                 status:{
                    type: String,
                    default: "Traitement en cours..."
                },

                measures:{
                    type:Object,
                    default:null
                },
            }
        ],

        amount:{
            type: Number,
            required:true
        },
        expeditionaddress:{type:Object,required:true},
        status:{type:String, default:"En traitement"}
      
    },
    {timestamps:true}
);

module.exports = mongoose.model("Order",OrderSchema);