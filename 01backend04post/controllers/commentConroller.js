// import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// business logic
exports.createComment = async(req,res) => {
    try {
        // fetch data from req body
        const {post,user,body} = req.body;
        // create a comment object
        const comment = new Comment({
            post,user,body
        });

        // save the new comment into the database
        const savedComment = await comment.save();

        // find the post by ID, add the new comment to its cooments array
        const updatedPost = await Post.findByIdAndUpdate(post,{$push: {comments:savedComment._id}},{new:true})
                            .populate("comments") // populte the coments array with comment documents
                            .exec();
        
        res.json({
            post: updatedPost,
        })
    } catch (error) {
            res.status(500).json({
                error:"Error while creating comment",
            });
    }
}
