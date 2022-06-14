const express = require("express");

// router
const router = express.Router();

// importing controller functions
const {saveStudent, getAllStudents, getStudentsAsPerFilter, getStudentsAsPerSearch} = require("../controllers/student");

// crud operations
router.route("/").post(saveStudent);
router.route("/all/:page/:limit").get(getAllStudents);
router.route("/filter/:page/:limit").post(getStudentsAsPerFilter);
router.route("/search/:page/:limit").post(getStudentsAsPerSearch);



// exporting router
module.exports = router; 