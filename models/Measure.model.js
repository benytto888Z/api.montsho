const mongoose = require("mongoose");

const MeasureSchema = new mongoose.Schema(
    {
        userId:{type:String,required:true},
        orderId:{type:String,required:true},
        productId:{type:String,required:true},
        
        sleeve:{type:Number,default:0},
        shoulder:{type:Number,default:0},
        chest:{type:Number,default:0},
        stomach:{type:Number,default:0},
        hip:{type:Number,default:0},
        neck:{type:Number,default:0},
        bodylength:{type:Number,default:0},
        biceps:{type:Number,default:0},
        wrist:{type:Number,default:0},
    },
    {timestamps:true}
);

module.exports = mongoose.model("Measure",MeasureSchema);