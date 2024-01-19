// importing libraries
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes.js';
import AuthRouter from './routes/auth.routes.js';
import cors from 'cors';

// initialization of imported library
dotenv.config();
const app = express();
app.use(cors());

// using json as req body - should be placed before route declarations
app.use(express.json());

// connecting MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => { console.log("Mongoose connected"); })
  .catch((err) => { console.log("Error is " + err); });

app.get('/', (req, res) => res.send('Hello World!'));

// route declarations
app.use('/api/user', UserRouter);
app.use('/api/auth', AuthRouter);

// error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

// listening app at port 3000
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!!`));
