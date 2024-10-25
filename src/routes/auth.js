const express = require('express');
const User=require('../models/user');
const bcrypt = require('bcrypt');
const validator = require('validator');
const {validateSignupData}=require('../utils/validation');

const router=express.Router();

router.post('/signup',async (req,res)=>{
    try{
        validateSignupData(req);
        const {firstName,lastName,email,age,photoUrl,about,gender,skills,password} = req.body;
        
        const passwordHash =await bcrypt.hash(password,10);
        const user= new User({
            firstName,
            lastName,
            email,
            age,
            photoUrl,
            about,
            gender,
            skills,
            password: passwordHash,
        });
        await user.save();
        res.send("User saved succesfully.");
    }
    catch(error){
        res.status(400).send(`${error}`);
    }
    
    
});
router.post('/signin',async (req,res)=>{
    try{
        const { email,password }=req.body;
        if(!validator.isEmail(email)){
            throw new Error("Email id is not valid");
        }
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("Wrong credentials");
        }

        const isPassword = await user.verifyPassword(password);
        if(isPassword){
           const token =await user.getJwt();
           res.cookie("token",token);
            res.send("User logged in");
        }
        else{
            throw new Error("Wrong credentials");
        }
        
    }
    catch(err){
        res.status(400).send(`${err}`)
    }
});

module.exports = router;