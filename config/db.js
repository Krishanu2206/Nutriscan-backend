const mongoose= require('mongoose');

const mongoURL = process.env.MONGO_URL; 

const connecttoDB2 = async () => {
    try {
      await mongoose.connect(mongoURL);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  };
  
module.exports = connecttoDB2;
