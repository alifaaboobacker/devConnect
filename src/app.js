const express=require('express');
const dataConnect=require('./config/database.js');
const authRouter=require('./routes/auth')
app=express()

app.use(express.json());
// app.use(express.cookies())
app.use('/',authRouter);


dataConnect()
.then(()=>{
    console.log("database connected")
    appusers=app.listen(7777);
    console.log("listening");
}).catch((err)=>{
    console.log("Database is not connected!!");
})
