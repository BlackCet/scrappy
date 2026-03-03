const express = require('express');
const mongoose = require('mongoose');
require('./scheduler');
const cors = require('cors');
require('dotenv').config({ path: '../.env' }); // Pull from root

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected: Ready to store intel.'))
  .catch(err => console.error('DB Connection Error:', err));

// Mount Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Intel Engine Backend live on port ${PORT}`));