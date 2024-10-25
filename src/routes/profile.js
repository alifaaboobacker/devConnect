const express=require('express');
const User=require('../models/user');
const {userAuth}= require('../middleware/auth')
const router = express.Router();

router.get('/profile',userAuth,async (req,res)=>{
 try{
    const user = req.user;
    res.send(user);

 }
 catch(err){
    res.status(400).send("Failed to fetch details"+err);
 }
});

module.exports=router;