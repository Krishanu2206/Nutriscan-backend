const express= require('express');
/* const mongoose = require('mongoose'); */
const cors=require('cors');
const colors = require('colors');
const morgan = require('morgan');
const dotenv= require('dotenv');
/* const connecttoDB2 = require('./config/db.js'); */

// DOTENV
dotenv.config();

//MONGODB CONNECTION
const mongoose= require('mongoose');

const mongoURL = process.env.MONGO_URL; 

const connecttoDB = async () => {
    try {
      await mongoose.connect(mongoURL);
      console.log(`Connected to MongoDB ${mongoose.connection.host}`);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  };
connecttoDB();
/* connecttoDB2(); */

//REST OBJECT
const app=express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


//ROUTES
app.use('/api/v1/auth', require("./routes/userroutes"));
app.use('/api/v1/post', require("./routes/postroutes"));
app.use('/api/v1/history', require("./routes/historyroutes"));
//ROOT ROUTE
app.get("/", (req, res)=>{
    res.status(200).send({
        "success" : true,
        "message" : "Node server running"
    })
});

//PORT 
const port = 3000;


//LISTEN
app.listen(port, ()=> { 
    console.log(`app is listening on port ${port}`);
});
