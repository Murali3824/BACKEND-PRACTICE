// app create
const express = require("express");
const app = express();

// load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware to parse json request body
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const fileupload = require("express-fileupload")
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp'
}))

// connect to the database
const dbConnect = require("./config/database");


// cloud coonect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// route import and mount
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload",Upload);


// default Route 
app.get("/",(req,res) => {
    res.send(`<h1>hello</h1>`);
})

// start server
app.listen(PORT,() => {
    console.log(`Server started at succesfully at ${PORT} `);
})