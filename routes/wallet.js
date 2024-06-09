const express = require('express');
const Wallet = require('../models/Wallet');
const router = express.Router();

router.post('/initialize', async (req, res) => {
  try {
    const walletExists = await Wallet.findOne();
    if (walletExists) {
      return res.status(400).json({ error: 'Wallet already initialized' });
    }
    const wallet = new Wallet();
    const savedWallet = await wallet.save();
    res.json(savedWallet);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/balance', async (req, res) => {
  try {
    const wallet = await Wallet.findOne();
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/deposit', async (req, res) => {
  try {
    const wallet = await Wallet.findOne();
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }
    wallet.balance += req.body.amount;
    const updatedWallet = await wallet.save();
    res.json(updatedWallet);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/withdraw', async (req, res) => {
  try {
    const wallet = await Wallet.findOne();
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }
    if (wallet.balance >= req.body.amount) {
      wallet.balance -= req.body.amount;
      const updatedWallet = await wallet.save();
      res.json(updatedWallet);
    } else {
      res.status(400).json({ error: 'Insufficient balance' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
