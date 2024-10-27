const mongoose = require('mongoose')
const User=require('../models/user');
const connectionRequest = new mongoose.Schema({
    "sender":{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        index:true
    },
    "reciever":{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        index:true,
        ref:User,
    },
    "status":{
        type:String,
        enum:{
            values:['interested','accepted','ignored','rejected'],
            message:"invalid  status"
        }
    }

},{timestamps:true});

connectionRequest.pre("save",async function(){
    const connection = this;
    if(connection.sender.equals(connection.reciever))
    {
        throw new Error("You cant send connection to yourself");
    }
})

const ConnectionRequest = mongoose.model("ConnectionRequest",connectionRequest);

module.exports=ConnectionRequest;