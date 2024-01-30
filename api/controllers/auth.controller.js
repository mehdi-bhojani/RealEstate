import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

export const sigunp = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ userName, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User Created success" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({email});
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(404, "wrong password"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};


export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({email : req.body.email})
    if(user){
      const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);
      const {password : pass,...rest} = user._doc;
      res
        .cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(rest)
    }
    else{
      const generatedpassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedpassword,10);
      const newUser = new User({userName: req.body.name,email: req.body.email,password: generatedpassword, avatar: req.body.photo });
      await newUser.save();
      const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET_KEY);
      const {pasword : pass, ...rest} = newUser._doc;
      res
        .cookie('access_token',token, {httpOnly: true})
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
}