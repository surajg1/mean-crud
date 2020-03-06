const express = require("express");
const router = express.Router();
const Student  = require('../models/student');
const ObjectId = require('mongoose').Types.ObjectId;

router.get("/", (req,res)=>{

    Student.find().then(doc => {
        res.send(doc);
    }).catch(err =>{
        res.status(500).send("Error", err);
    })
});

router.get("/:id",(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record found with this id ${req.params.id}');

    Student.findById(req.params.id).then(doc=>{
        res.send(doc);
    }).catch(err=>{
        res.status(500).send("Error", err);
    })
});

router.post("/",(req,res)=>{
    var std = new Student({
        name : req.body.name,
        sclass : req.body.sclass,
        email : req.body.email
    });

    std.save().then(doc=>{
        res.send(doc);
    }).catch(err=>{
        res.status(500).send("Faild to Insert!", err);
    })
})

router.put("/:id", (req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record found with this id ${req.params.id}');
        
    var std = {
        name : req.body.name,
        sclass : req.body.sclass,
        email : req.body.email
    };

    console.log(std);

    Student.findByIdAndUpdate(req.params.id, { $set: std }, {new: true})
            .then(doc=>{
                res.send(doc);
            }).catch(err=>{
                res.status(400).send("Faild to update", err)
    });

})

router.delete("/:id", (req, res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record found with this id ${req.params.id}');

    Student.findByIdAndRemove(req.params.id)
        .then(doc => {
            res.send(doc);
        }).catch(err => {
            res.status(400).send("Faild to update",err);
        });
})

module.exports = router;