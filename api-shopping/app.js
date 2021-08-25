require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database');

app.use(cors({
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Authorization", "Content-Type"]
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

require('./api/controllers/userController')(app);
require('./api/controllers/addressController')(app);
require('./api/controllers/productController')(app);
require('./api/controllers/categoryController')(app);
require('./api/controllers/orderController')(app);

const DBConnection = async () => {
  try {
    await db.connection.authenticate();
    console.log('Connection has been established successfully.');
    if (process.env.NODE_ENV == 'test') {
      //await db.connection.sync({ force: true});
    }
  } catch (error) {
    console.error('Unable to connect to database!', error);
  }
}

DBConnection();



app.listen(1996);
