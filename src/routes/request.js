const connectionRequest=require('../models/connectionRequests');
const {userAuth}=require('../middleware/auth');
const express = require('express');
const ConnectionRequest = require('../models/connectionRequests');
const router = express.Router();

router.post("/request/send/:status/:recieverId",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const senderId = loggedInUser._id;
        const {status,recieverId}=req.params;

        allowedStatus=['interested','ignored'];

        if(!allowedStatus.includes(status)){
            throw new Error("Status is not valid.")
        }
        const request = connectionRequest.findOne(
            {$or:[{senderId,recieverId},{sender:recieverId,reciever:senderId}]
        });
        
        if(request){
            throw new Error("Request already exist");
        }
        const connectionRequest = new ConnectionRequest(
            senderId,recieverId,status
        );
        await connectionRequest.save();
        res.send("Connection request had send successfully");

    }
    catch(err){
        res.status(400).send("Error:"+err);
    }


});



module.exports =router;