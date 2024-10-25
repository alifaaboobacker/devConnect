const express=require('express');
const User=require('../models/user');
const {userAuth}= require('../middleware/auth')
const {validateProfileEditData}=require('../utils/validation')
const router = express.Router();

router.get('/profile/view',userAuth,async (req,res)=>{
 try{
    const user = req.user;
    res.send(user);

 }
 catch(err){
    res.status(400).send("Failed to fetch details"+err);
 }
});

router.patch('/profile/edit',userAuth,async (req,res)=>{
   try{
      validateProfileEditData(req);
      const loggedUser = req.user;
      Object.keys(req.body).forEach((key)=> (loggedUser[key]= req.body[key]));
      await loggedUser.save
      res.json({message:"Profile updated successfully",
         data:loggedUser
      });
   }  
   catch(err){
      res.status(400).send("Error:"+err);
   }
   
});

module.exports=router;