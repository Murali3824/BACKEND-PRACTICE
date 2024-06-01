// import model
const Post = require("../models/postModel");

exports.createPost = async (req,res) => {
    try{
        // fetch data from req body
        const {title,body} = req.body;
        // create a comment object
        const post = new Post({
            title,body,
        });
        const savesPost = await post.save();

        res.json({
            post:savesPost,
        });
    }catch (error) {
        res.status(500).json({
            error:"Error while creating post",
        });
    }
}



exports.getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find().populate("likes").populate("comments").exec();
        // const posts = await Post.find()
        res.json({
            posts,
        })
    }catch (error) {
        res.status(500).json({
            error:"Error while creating get all posts",
        });
    }
}