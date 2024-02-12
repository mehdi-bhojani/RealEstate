import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res)=>{
    res.json({
        message : 'Hello Worlds',
    });
};

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account!'))

    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set : {
                    userName: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            {new : true}
        );

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401,'you can only delete your account'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User Had been deleted');
    } catch (error) {
        next(error)
    }
}

export const getUserListing = async (req, res, next) => {
    if(req.params.id === req.user.id){
        try {
            const listing = await Listing.find({userRef : req.params.id});
            res.status(200).json(listing);
        } catch (error) {
            next(error)
        }
    }else{
        return next(errorHandler(401, 'You can only view your own listing'));
    }
}

export const getUser = async (req,res,next)=> {
    try {
        const userData = await User.findById(req.params.id);
        if(!userData){
            next(errorHandler(404, 'No user found!'));
        }
        const {password:pass, ...rest} = userData._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
}