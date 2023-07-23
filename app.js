require('dotenv').config();
require('express-async-errors');

const express = require('express')
const app = express()

//db
const connectDB = require('./db/connect');
const authRouter = require('./routes/authRoute');

app.use(express.json());

app.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();