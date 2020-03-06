const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./dbConnection');

var studentController = require("./controllers/studentController");
var app = express();

app.use(bodyParser.json()); 


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
        );
    next();
}); 

app.listen(3000, ()=>{
    console.log("App is running on port 3000");
});

app.use("/student", studentController);

