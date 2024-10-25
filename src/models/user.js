const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    "firstName": { 
        type:String,
        required:true,
    },
    "lastName": {type:String},
    "email": {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    "age": {type:Number,
        min:18,
    },
    "photoUrl":{
        type:String,
    },
    "about":{
        type:String,
        default:"About yourself",
        minLength:4,
        maxLength:300
    },
    "gender":{type:String,
       validate(value){
        if(!['male','female','transgender','others'].includes(value)){
                throw new Error("Gender data is not valid");
        }
       }
    },
   "skills":{
    type:[String],
   },
   "password":{
    type:String,
    required:true
   }
},{timestamps:true})

const User=mongoose.model("User",userSchema);
module.exports=User;