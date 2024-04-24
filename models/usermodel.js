const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userschema=new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required :true,
        min : 6,
        max : 64
    },
    role : {
        type : String,
        default : 'user'
    }
},{timestamps : true}); //whenever a new user is created the time and date is also captured

module.exports = mongoose.model("User", userschema);