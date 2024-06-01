// import the model
const Todo = require("../models/Todo")

exports.getTodo = async (req,res) => {
    try {
        // fetch all todo items
        const todos = await Todo.find({});

        // response
        res.status(200).json(
            {
                succes:true,
                data:todos,
                message:'Entire Todo is fetched'
            }
        );
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



exports.getTodoById =  async (req,res) => {
    try {
        // extract todo items on Id
        const id = req.params.id;
        const todos = await Todo.findById({_id: id});

        // data for given id not found
        if(!todos){
            return res.status(404).json(
                {
                    succes:false,
                    message:"no data found with given Id"            }
            )
        }

        // data for given id found
        return res.status(200).json(
            {
                succes:true,
                data:todos,
                message:`Todo ${id} data succesfully fetched`
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
