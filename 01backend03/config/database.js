const mongoose=require("mongoose");

require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL, {
        userNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(
        ()=>console.log("db is connected")
    )
    .catch(  (error)=>{
        console.log("issue in db");
        console.error(error.message);
        process.exit(1);
    });
}
module.exports=dbConnect;