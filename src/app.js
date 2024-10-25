const express=require('express');
const dataConnect=require('./config/database.js');
const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const cookieParser=require('cookie-parser');
app=express()

app.use(express.json());
app.use(cookieParser());
app.use('/',authRouter);
app.use('/',profileRouter);


dataConnect()
.then(()=>{
    console.log("database connected")
    appusers=app.listen(7777);
    console.log("listening");
}).catch((err)=>{
    console.log("Database is not connected!!");
})
