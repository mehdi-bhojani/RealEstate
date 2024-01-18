import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export  const  sigunp  = async (req,res,next) => {
    const {userName,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({userName,email,password: hashedPassword});
    try {
        await newUser.save();
        res.status(201).json({message:"User Created success"})        
    } catch (error) {
        next(error);
    }
}