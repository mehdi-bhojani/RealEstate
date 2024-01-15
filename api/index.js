//importing libraries
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes.js';


// initialization of imported library
dotenv.config();
const app = express();

//conneting MongoDB
mongoose.connect(process.env.MONGO)
.then(()=>{console.log("Monoose conneted")})
.catch((err)=>{console.log(err)})


app.get('/', (req, res) => res.send('Hello World!'));


//listening app at port 3000
const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!!`));

app.use('/api/user',UserRouter);
