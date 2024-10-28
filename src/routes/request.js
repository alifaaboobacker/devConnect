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
        const request = await ConnectionRequest.findOne({
            $or: [
                { sender: senderId, reciever: recieverId },
                { sender: recieverId, reciever: senderId }
            ]
        });
        
      
        
        if(request){
            throw new Error("Request already exist");
        }
        const connectionRequest = new ConnectionRequest(
            {
                sender:senderId,
                reciever:recieverId,
                status:status
            }
        );
        await connectionRequest.save();
        res.json({message:"Connection request had send successfully",
            data:connectionRequest,
    });

    }
    catch(err){
        res.status(400).send("Error:"+err);
    }


});

router.post('/request/review/:status/:requestId',userAuth,async (req,res)=>{
    try{
        const recieverId=req.user._id
        console.log(recieverId)
        const {status,requestId}=req.params;
        allowedStatus=['rejected','accepted'];
        if(!allowedStatus.includes(status))
        {
            throw new Error("Status is invalid");
        }
        const data = await ConnectionRequest.findOne({
            _id:requestId,
            reciever:recieverId,
            status:"interested"
        }).populate("sender",["firstName","lastName","about","age","gender"]);
        console.log(data);
        if(!data){
            throw new Error("Request not found");
        }
        data.status=status;
        await data.save();
        res.json({
            "message":`Request ${status} successfully`,
            "data":data,
        });

        
    }
    catch(err){
        res.status(400).send("Error:"+err);
    }
    
});

module.exports =router;