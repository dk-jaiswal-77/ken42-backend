const express = require("express");

// router
const router = express.Router();

// importing controller functions
const {loginUser} = require("../controllers/login");

// crud operations
router.route("/").post(loginUser);


// exporting router
module.exports = router;