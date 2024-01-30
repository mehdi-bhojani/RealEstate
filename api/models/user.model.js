import mongoose from "mongoose";

//creating schema for users
const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required: true,
        unique : true,
    },
    email : {
        type : String,
        required: true,
        unique : true,
    },
    password : {
        type : String,
        required: true,
    },
    avatar : {
        type : String,
        default : 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png'
    },
},
    {timestamps : true},
)


const User = mongoose.model('User',userSchema);

export default User;