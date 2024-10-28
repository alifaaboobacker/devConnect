const express = require('express');
const router = express.Router();
const {userAuth}=require('../middleware/auth');
const { Connection } = require('mongoose');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequests');
const userData = ["firstName","lastName","about","age","gender"]
router.get('/user/connections',userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {
                    sender: loggedInUser._id,
                    status:"accepted"
                },
                {
                    reciever:loggedInUser._id,
                    status:"accepted"
                }
            ]
        }).populate("sender",userData)
        .populate("reciever",userData)
        console.log(connectionRequest);
        const data = connectionRequest.map((row)=>{
            if(row.sender.toString()=== loggedInUser._id.toString()){
                return row.sender;
            }
            return row.reciever;
        });
        res.json({data:data});
    }
    catch(err){
        res.status(400).send("Error:"+err);
    }
});
router.get('/user/requests',userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user
        const connectionRequest = await ConnectionRequest.find({
            reciever:loggedInUser._id,
            status:"interested"
        }).populate("sender",userData);
        
        res.json({
            data:connectionRequest
        })
    }
    catch(err){
        res.status(400).send("Error:"+err);
    }
});
router.get('/user/feed',userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;
        const page = parseInt(req.query.page)|| 1;
        let limit = parseInt(req.query.limit)||20;
        limit = limit > 50 ? 50 :limit;
        const skip = (page-1)* limit;
        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {
                    sender:loggedInUser._id
                },
                {
                    reciever:loggedInUser._id
                }
            ]
        }).select("sender reciever");
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach(req=>{
            hideUsersFromFeed.add(req.sender);
            hideUsersFromFeed.add(req.reciever);
        });

        const users = await User.find({
            $and:[{_id: { $nin: Array.from(hideUsersFromFeed) }},
                {_id: {$ne:loggedInUser._id}}
            ]
            
        }).select(userData).skip(skip).limit(limit);
        res.json({message:"Data fetched",data:users});
    }
    catch(err){
        res.status(400).send("Error:"+err);
    }
});
module.exports=router;