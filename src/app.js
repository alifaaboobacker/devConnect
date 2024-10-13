const express=require('express');
app=express()
app.use('/start',(req,res)=>{
    res.send("Hi from start");
});

app.use('/',(req,res)=>{
    res.send("Hi from dashboard");
});


app.listen(7777);