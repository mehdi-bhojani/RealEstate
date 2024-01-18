//importing libraries
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes.js';
import AuthRouter from './routes/auth.routes.js';


// initialization of imported library
dotenv.config();
const app = express();

//conneting MongoDB
mongoose.connect(process.env.MONGO)
.then(()=>{console.log("Monoose conneted")})
.catch((err)=>{console.log("error is "+err)})


app.get('/', (req, res) => res.send('Hello World!'));


//listening app at port 3000
const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!!`));

//using json as req body
app.use(express.json());

app.use('/api/user',UserRouter);
app.use('/api/auth',AuthRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
