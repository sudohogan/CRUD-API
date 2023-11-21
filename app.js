require('dotenv').config();
require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

const connectDB = require('./db/connect');
const userRouter = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const payPalRouter = require('./routes/payPalRoute');
const verifyEmailRoute = require('./routes/verifyEmailRoute');
const allowCors = require('./utils/allowCors')

app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/user', userRouter, adminRoute);
app.use('/api/v1/subscription', payPalRouter);
app.use('/api/v1/verify', verifyEmailRoute);
app.use('/', allowCors)

const port = process.env.NODE_ENV || 3001;
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

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));
