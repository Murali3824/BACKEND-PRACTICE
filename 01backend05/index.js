const express = require("express")
const app = express();


// load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware to parse json request body
app.use(express.json());

// connect to the database
const dbConnect = require("./config/database");


// start server
app.listen(PORT,() => {
    console.log(`Server started at succesfully at ${PORT} `);
})

// import routes for TODO API
const blog = require("./routes/blog");
// mount the todo ASPI routes
app.use("/api/v1",blog);

// default Route 
app.get("/",(req,res) => {
    res.send(`<h1>CodeHelpBlogs</h1>`);
})