require('dotenv').config()
const express=require('express')
// import express from "express"
const app=express()
const port=4000

app.get('/',(req,res) => {
    res.send('hello world')
})

app.get('/twitter',(req,res) => {
    res.send('<h1>welcome to twitter</h1>')
})

app.listen(process.env.PORT,() => {
    console.log(`example app listening on port ${port}`);
})