const validator = require('validator');
const validateSignupData=(req)=>{
    const {firstName,lastName,email,password}=req.body;

    if(!firstName || !lastName){
        throw new Error("Name id required.");
    }
    if(!email){
        throw new Error("Email id is required.");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email id is not valid.");
    }
    if(!password){
        throw new Error("password is not valid.");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please provide strong password.");
    }

};

module.exports={
    validateSignupData,
}
