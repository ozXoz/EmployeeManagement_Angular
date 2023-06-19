const mongoose=require('mongoose')
const jwt = require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please Provide Username"]
    },
    email:{
        type:String,
        required:[true,"Please Provide Email"]
    },
    password:{
        type:String,
        required:[true,"Please Provide Password"]
    }
})

const user_db=mongoose.model("user",userSchema);
module.exports=user_db;