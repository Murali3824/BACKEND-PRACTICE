// import the model
const Todo = require("../models/Todo")

// define route handler
exports.createTodo = async (req,res) => {
    try {
        // extract title and description from request body
        const {title,description}  = req.body;
        // create a new Todo Obj and insert in DB
        const response = await Todo.create({title,description});
        // send a json response with a succes flag
        res.status(200).json(
            {
                succes:true,
                data:response,
                message:'Enter Created Succesfully'
            }
        );
    } catch (error) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                succes:false,
                data:"internal server error",
                message:err.msg,
            }
        )
    }
}

