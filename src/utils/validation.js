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
const validateProfileEditData=(req)=>{
    const allowedEditFields=['firstName','lastName','age','gender','photoUrl','skills','about'];
    const isAllow=Object.keys(req.body).every(field => allowedEditFields.includes(field));
    if(isAllow){
        if (req.body.about && req.body.about.length > 100) {
            throw new Error("About can only be 100 characters long");
        }

    }
    else{
        throw new Error("Invalid edit request.")
    }
};
module.exports={
    validateSignupData,
    validateProfileEditData
}
