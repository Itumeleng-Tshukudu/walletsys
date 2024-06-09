const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('Wallet', walletSchema);
