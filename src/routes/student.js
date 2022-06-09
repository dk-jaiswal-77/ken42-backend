const express = require("express");

// router
const router = express.Router();

// importing controller functions
const {saveStudent, getAllStudents, getStudentsAsPerFilter} = require("../controllers/student");

// crud operations
router.route("/").post(saveStudent);
router.route("/all/:page/:limit").get(getAllStudents);
router.route("/filter/:page/:limit").get(getStudentsAsPerFilter);



// exporting router
module.exports = router; 