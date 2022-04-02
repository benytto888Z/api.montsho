const mongoose = require('mongoose');
// const MONGO_URI = 'mongodb+srv://' + process.env.DB_USER_PASS + '@clustermeetland.ucnlm.mongodb.net/meetlandDB';
// const MONGO_URI = 'mongodb+srv://' + process.env.DB_USER_PASS + '@clusterruffstore.teclp.mongodb.net/ruffstoreDB';
// const MONGO_URI  = 'mongodb+srv://' + process.env.DB_USER_PASS + '@ruffstore.9eyd1.mongodb.net/ruffstoreDB?retryWrites=true&w=majority'
const MONGO_URI  = 'mongodb+srv://' + process.env.DB_USER_PASS + '@ruffstore.9eyd1.mongodb.net/ruffstoreDB'

// connect to mongodb
mongoose.connect(MONGO_URI,{ 
    useNewUrlParser: true,
     useUnifiedTopology: true,
     connectTimeoutMS: 10000,
     writeConcern: {
        j: true
    }
}).then(()=>console.log("Mongodb connected ! "))
  .catch(err => console.log(err));