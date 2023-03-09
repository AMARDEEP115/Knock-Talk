const express=require("express");
const http=require("http");
require("dotenv").config();

const httpServer=http.createServer(app);


app.get("/",(req,res)=>{
    res.send("Home");
});

httpServer.listen(process.env.port,()=>{
    console.log(`server is running at port ${process.env.port}`);
});