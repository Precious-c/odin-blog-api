const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/PostModel");
const Comment = require("../models/CommentModel");

module.exports = {
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      // console.log(posts)
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
    }
  },
  newPost: async (req, res) => {
    try {
      console.log("in new post");
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);
      console.log(req.file);
      const post = new Post({
        postTitle: req.body.postTitle,
        postContent: req.body.postContent,
        // postImage: result.secure_url,
        // cloudinaryId: result.public_id,
      });
      console.log("post: ", post);
      const save = await post.save();
      console.log("save: ", save);
      return res.status(200).json({ success: true, post: post });
    } catch (err) {
      console.log(err);
      return res.status(500).status({ success: false, message: err.message });
    }
  },
  getOnePost: async (req, res) => {
    try {
      console.log("getting one post");
      const id = req.params.id;
      const post = await Post.findById(id);
      if (!post) res.status(404).json({ success: false, message: "post not found" });
      res.status(200).json({ success: true, post: post });
    } catch (err) {
      console.log(err);
      return res.end();
    }
  },
  updateOnePost: async (req, res) => {
    try {
      const id = req.params.id;
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          postTitle: req.body.postTitle,
          postContent: req.body.postContent,
        },
        { new: true }
      );
      console.log("updated post: " + updatedPost);
      if (!updatedPost) return res.status(404).json({ success: false, message: "post not found" });
      console.log("Operation successul. Responding now");
      res.status(200).json({ success: true, post: updatedPost });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  deleteOnePost: async (req, res) => {
    try {
      const id = req.params.id;
      // find post
      const post = await Post.findById(id);
      // delete post image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await post.remove();
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  getPublished: async (req, res) => {
    try {
      const publishedPosts = await Post.find({ status: "published" });
      console.log(publishedPosts);
      if (!publishedPosts.length)
        res.status(404).json(`found ${publishedPosts.length} published Posts`);
      return res
        .status(200)
        .json({ success: true, noOfPublishedPosts: publishedPosts.length, posts: publishedPosts });
    } catch {
      res.status(400).status(err);
    }
  },
  publishPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.status === "published")
        return res.status(400).json({ success: false, message: "post is already published" });
      post.status = "published";
      console.log(post);
      await post.save();
      console.log(post);
      return res.status(200).json({ success: true, post });
      // const result = await Post.findByIdAndUpdate(req.params.id, {
      //     published: "unpublished",
      // },{new: true})
      // console.log(result)
    } catch (err) {
      console.log(err);
    }
  },
  unpublishPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.status === "unpublished")
        return res.status(400).json({ success: false, message: "post is already unpublished" });
      post.status = "unpublished";
      console.log(post);
      await post.save();
      console.log(post);
      return res.status(200).json({ success: true, post });
    } catch (err) {
      console.log(err);
    }
  },

  //comments
  getComments: async (req, res) => {
    try {
      const id = req.params.id;
      const post = await Post.findById(id);
      const comments = post.comments;
      return res
        .status(200)
        .json({ success: true, noOfComments: comments.length, comments: comments });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, err });
    }
  },
  newComment: async (req, res) => {
    try {
      const id = req.params.id;
      const post = await Post.findById(id);

      //create new comment
      const comment = await Comment.create({
        commentContent: req.body.commentContent,
        commentedBy: req.body.commentedBy,
        postID: id,
      });

      // add new comment to post
      await Post.findByIdAndUpdate(
        id,
        {
          $push: {
            comments: comment,
          },
        },
        { upsert: true, new: true }
      );
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, err });
    }
  },
  deleteComment: async (req, res) => {
    const id = req.params;
    console.log(id);
  },
};
