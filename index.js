const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const path = require('path');
const  url = require('url');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();
const cors= require('cors');



// const { getAccessToken } = require('./controllers/auth.controller');


app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
// CORS

/*
app.use((req, res, next) => {
  const pathi = url.parse(req);
  console.log(pathi)
});*/

/*
const corsOptions = {
  //origin: process.env.CLIENT_URL, //|| process.env.ADMIN_URL,
  origin: "*" ,//|| process.env.ADMIN_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));*/

// app.use(cors());
app.use(express.json());
app.use(fileUpload({useTempFiles:true}))





const uploadFileRoute = require("./routes/fileUpload.route");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");
const stripeRoute = require("./routes/stripe.route");


//routes
app.use("/api/auth",authRoute);
// app.use("/api/authUser",userRoute2);

app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",orderRoute);
app.use("/api/checkout",stripeRoute);
app.use("/api/upload",uploadFileRoute);
//jwt

// app.get("*", getAccessToken);




app.listen(process.env.PORT || 5008,()=>{
    console.log(`server listen on port ${process.env.PORT}`);
})