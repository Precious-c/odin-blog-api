const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    postTitle: {type: String, required: true, min: 10, max: 30, unique: true},
    postContent: {type: String, required: true,},
    postImage: {type: String, default: ''},
    comments: {type: Array, default: []},
    // cloudinaryId: { type: String, required: true},
    status: {type: String, default: "published", enum: ["published", "unpublished"]},
}, { timestamps: true} )

module.exports = mongoose.model("Post", PostSchema)