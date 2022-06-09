const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name : {type : String, required : true, trim : true}, 
    roll_number : {type : String, required : true, trim : true},
    term : {type : String, required : true, trim : true},
    current_year : {type : String, required : true, trim : true},
    contact_number : {type : String, required : true, trim : true}
}, {versionKey : false, timestamps : true});

module.exports = mongoose.model("student", studentSchema);