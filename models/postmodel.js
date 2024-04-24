const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postschema = new Schema({
    title : {
        type  : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    }
}, {timestamps : true});
 
module.exports = mongoose.model('Post', postschema);