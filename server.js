require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const ruleRoutes = require('./routes/ruleRoutes');

// express app
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json())

// calling apis 
app.use('/api/rules', ruleRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT || PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
