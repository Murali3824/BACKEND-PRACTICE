const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require ("jsonwebtoken");
require("dotenv").config();

// SIGNUP route handler
exports.signup = async(req,res) => {
    try {
        // get data
        const {name,email,password,role} = req.body;
        // check if user already exist
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                meassage:'user already exists',
            });
        }

        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password,10);
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"error in hashing"
            })
        }


        // create entry for user
        const user = await User.create({
            name,email,password:hashedPassword,role
        })
        return res.status(200).json({
            success:true,
            message:'user created succesfully'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'user cannot be registered,please try again'
        })
    }
}



// LOGIN route handler
exports.login = async(req,res) => {
    try {
        // data fetch
        const {email,password} = req.body;
        // validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'please fill all the details'
            });
        }

        // check for registered user
        let user = await User.findOne({email});
        // if not a registered user
        if(!user){
            return res.status(401).json({
                success:false,
                meassage:'user is not registered'
            })
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role
        }
        // verify password and generate a JWT token
        if (await bcrypt.compare(password,user.password)) {
            // password match
            let token = jwt.sign(payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h",
                                });
            
            // console.log(user);

            user = user.toObject();
            user.token = token;
            // console.log(user);

            user.password = undefined;
            // console.log(user);

            const options = {
                expires:new Date(Date.now() +3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("cookietoken",token,options).status(200).json({
                success:true,
                token,
                user,
                message:'user logged in succesfully'
            })

        } else {
            // password do not match
            return res.status(403).json({
                success:false,
                message:"password incorrect",
            })
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login failure'
        })
    }
}