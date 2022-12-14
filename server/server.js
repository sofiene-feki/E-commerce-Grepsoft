const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();

//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('conected to mdb');
  })
  .catch((err) => {
    console.log(err.message);
  });

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

//routes middleware
readdirSync('./Routes').map((r) => app.use('/api', require('./Routes/' + r)));

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is running on port ${port}`));
