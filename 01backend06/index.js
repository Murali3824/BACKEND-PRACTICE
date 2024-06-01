const express = require("express");
const app = express();

// load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware to parse json request body
app.use(express.json());

// connect to the database
const dbConnect = require("./config/database");

// route import and mount
const user = require("./routes/user");
app.use("/api/v1",user);


// default Route 
app.get("/",(req,res) => {
    res.send(`<h1>hello</h1>`);
})

// start server
app.listen(PORT,() => {
    console.log(`Server started at succesfully at ${PORT} `);
})