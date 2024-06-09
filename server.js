const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const walletRoutes = require('./routes/wallet');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/wallet', walletRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
