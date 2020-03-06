const mongoose = require('mongoose'); 

var Student = mongoose.model("Student",{
    name : {type : String},
    sclass: {type: String},
    email : {type: String}
},'student');

module.exports = Student
