const mongoose = require("mongoose");

//schema definition
const Schema = mongoose.Schema;

//modeling
const employee_detail = new Schema({

    name : String,
    location : String,
    position : String,
    salary : Number

})


// const StudentData = mongoose.model("student", student_detail)
const EmployeeData = mongoose.model("employee", employee_detail)
module.exports = EmployeeData; 