const express = require("express");
const router = express.Router();

const {login,signup} = require("../controllers/Auth");
const {auth,isStudent,isAdmin} = require("../middlewares/auth")

router.post("/login",login);
router.post("/signup",signup);

// testing protected route
router.get("/test",auth, (req,res) => {
    res.json({
        succes:true,
        message:'welcome to the protected routen for test'
    })
})

// student protected route
router.get("/student",auth,isStudent, (req,res) => {
    res.json({
        success:true,
        message:'welcome to the protected routen for students'
    });
});

// admin protected route
router.get("/admin",auth,isAdmin, (req,res) => {
    res.json({
        success:true,
        message:'welcome to the protected routen for admin'
    });
});

module.exports = router;