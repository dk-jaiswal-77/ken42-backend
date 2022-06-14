// importing model
const Student = require("../models/student");

async function saveStudent(req, res){
    try{
        const student = await Student.create(req.body);
        res.status(200).json({successful : true, student});
    }catch(error)
    {
        console.log(error);
        res.status(400).json({successful : false, error});
    }
}

async function getAllStudents(req, res){
    try{
        const limit = +req.params.limit;
        const page = +req.params.page;
        const skip_count = (page-1)*limit;

        // console.log(limit,page);

        const students = await Student.find().skip(skip_count).limit(limit).lean().exec();
        const total_students_count = await Student.countDocuments();
        res.status(200).json({success : true, data : students, count : total_students_count});
    }catch(error){
        console.log(error);
        res.status(500).json({success : false, error});
    }
}

async function getStudentsAsPerFilter(req, res){
    try{
        const limit = +req.params.limit;
        const page = +req.params.page;
        const skip_count = (page-1)*limit;

        // console.log(limit,page);

        const students = await Student.find(req.body).skip(skip_count).limit(limit).lean().exec();
        // const total_students_count = await Student.countDocuments();
        res.status(200).json({success : true, data : students});
    }catch(error){
        console.log(error);
        res.status(500).json({success : false, error});
    }
}

async function getStudentsAsPerSearch(req, res){
    try{
        const limit = +req.params.limit;
        const page = +req.params.page;
        const skip_count = (page-1)*limit;

        let students;
        if(req.body.search_for == "")
        {
            students = await Student.find().skip(skip_count).limit(limit).lean().exec();
        }
        else
        {
            // {
            //     search_by : "", 
            //     search_for : ""
            // }
            if(req.body.search_by == "")
            {
                // all possbilities // name, roll_number, contact_number
            }
            else
            {
                students = await Student.find({[req.body.search_by] : {$regex:`/${req.body.search_for}/i`}}).skip(skip_count).limit(limit).lean().exec();
            }
        }

        // const total_students_count = await Student.countDocuments();
        res.status(200).json({success : true, data : students});
    }catch(error){
        console.log(error);
        res.status(500).json({success : false, error});
    }
}

module.exports = {saveStudent, getAllStudents, getStudentsAsPerFilter, getStudentsAsPerSearch};