// import the model
const Todo = require("../models/Todo")

// define route handler
exports.deleteTodo = async (req,res) => {
    try {
         //get id
        const {id} = req.params;

        await Todo.findByIdAndDelete(id);

        res.json(
            {
                succes:true,
                message:"Todo is DELETED"
            }
        )


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

