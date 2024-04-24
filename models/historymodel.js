const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  brands: {
    type:String,
    default : "Unknown"
  },
  productname : {
    type : String,
    default : "Unknown"
  },
  nutriments: [{
    name: {
      type : String,
      default : "Unknown"
    },
    value: {
      type : String,
      default : "Unknown"
    },
  }],
  imageurl : {
    type:String,
    default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzlhsDYjVEIJI7obaGy7FPvqh6SGe-w38TQQDbUtPukJ0Kn_ofrhrqufVrcqJgx9MwjPI&usqp=CAU"
  },
  code:{
    type : String
  },
  author : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {timestamps : true});

const History = mongoose.model('History', productSchema);

module.exports = History;
