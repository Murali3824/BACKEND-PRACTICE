const express = require("express");
const router = express.Router();

// import controller
const {dummyLink} = require("../controllers/dummyController");
const { createComment } = require("../controllers/CommentConroller");
const { createPost, getAllPosts } = require("../controllers/PostController");
const { likePost, unlikePost } = require("../controllers/LikeController");

// mapping create
router.get("/dummyroute",dummyLink);
router.post("/comments/create",createComment)
router.post("/posts/create",createPost)
router.get("/posts",getAllPosts)
router.post("/likes/like",likePost)
router.post("/likes/unlike",unlikePost)

//export
module.exports = router;  