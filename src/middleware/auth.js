const User=require('../models/user');
const jwt = require('jsonwebtoken');
const userAuth = async (req,res,next)=>{
    try
    {
        const cookies = req.cookies;
        const {token}=cookies;

        if(!token){
            throw new Error("Token is not valid");
        }

        const decodedMessage = await jwt.verify(token,"DevConnect@#Connect");

        const {_id} = decodedMessage;
        const user = await User.findOne({_id:_id})
        if (!user){
            throw new Error("User not found");
        }
        req.user=user;
        next();
    }
    catch(err){
        res.status(400).send("Error:"+err.message);
    }


}

module.exports={
    userAuth,
};