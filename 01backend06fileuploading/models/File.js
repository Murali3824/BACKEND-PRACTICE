const mongoose = require("mongoose");
const nodemailer = require("nodemailer")

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    },
    videoUrl:{
        type:String,
    },
})

// post middleware
fileSchema.post("save",async function(doc){
    try {
        console.log("DOC",doc);
        
        // transpoter
        // todo shift this configuration under /config folder
        let transpoter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        // sned mail
        let info = await transpoter.sendMail({
            from:'codehelp',
            to:doc.email,
            subject:"new file uploaded on cloudinary",
            html:`<h2> hello </h2> <p>File Uploaded</p> View here:<a href="${doc.imageUrl || doc.videoUrl}">${doc.imageUrl || doc.videoUrl}</a>` ,
        })
        console.log("INFO",info);
    } catch (error) {
        console.error(error);
    }
})

module.exports = mongoose.model("File",fileSchema);