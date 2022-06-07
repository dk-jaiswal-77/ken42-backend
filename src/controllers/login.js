// modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// importing model
const User = require("../models/user");

async function loginUser (req, res) {
    try{
        // email exists?
        const user = await User.findOne({email : req.body.email}).lean().exec();
        if(!user)
        {
            // email does not exist
            return res.status(400).json({success : false, msg : "invalid credentials..."});
        }
        
        // email exists // is user admin?
        if(user.userType != "admin")
        {
            // user is not admin
            return res.status(400).json({success : false, msg : "you are not authorised!..."});
        }
        
        // password match?
        const passwordMatched = await bcrypt.compare(req.body.password, user.password);
        if(!passwordMatched)
        {
            // password did not match
            return res.status(400).json({success : false, msg : "invalid credentials..."});
        }
        // password also matched // generate token
        const payload = {
            email : user.email,
            userId : user._id
        };
        const res_user = {
            email : user.email, 
            name : user.name
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY);
        res.status(200).json({success : true, user : res_user, token});
    }catch(error){
        console.log(error);
        res.status(500).json({success : false, msg : "internal server error..."});
    }
}


module.exports = {
    loginUser
};