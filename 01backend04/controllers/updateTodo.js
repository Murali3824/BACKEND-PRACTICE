// import the model
const Todo = require("../models/Todo")

// define route handler
exports.updateTodo = async (req,res) => {
    try {
         //get id
        // const {id} = req.params;
        const id = req.params.id;
        const {title,description}  = req.body;

        const todos = await Todo.findByIdAndUpdate(
                {_id:id},
                {title,description,UpdatedAt:Date.now()}
        )

        return res.status(200).json(
            {
                succes:true,
                data:todos,
                message:"Updated successfully"
            }
        )


    } catch (error) {
        console.error(err);
        res.status(500).json(
            {
                succes:false,
                error:err.message,
                message:'server error',
            }
        )
    }
}

