const express=require('express');
const dataConnect=require('./config/database.js');
const authRouter=require('./routes/auth.js');
const profileRouter=require('./routes/profile.js');
const requestRouter=require('./routes/request.js');
const userRouter=require('./routes/user.js');
const cookieParser=require('cookie-parser');
app=express()

app.use(express.json());
app.use(cookieParser());
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);

dataConnect()
.then(()=>{
    console.log("database connected")
    appusers=app.listen(7777);
    console.log("listening");
}).catch((err)=>{
    console.log("Database is not connected!!");
})
