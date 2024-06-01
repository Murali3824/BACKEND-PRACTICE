const express = require('express')
const app =express();

const bodyParser = require("body-parser")

app.use(bodyParser.json());

app.listen(8000,() => {
    console.log("server started at port n.o 8000");

})

app.post('/api/cars',(req,res) => {
    const {name,brand} = req.body;
    console.log(name);
    console.log(brand);
    res.send("car submitted succesfully")
})

app.get('/',(req,res) => {
    res.send("hello")
})

