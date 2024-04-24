const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  code: {
    type : String
  },
  author : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {timestamps : true});

const Verification = mongoose.model('Verification', verificationSchema);

module.exports = Verification;