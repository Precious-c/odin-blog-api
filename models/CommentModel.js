const mongoose = require("mongoose");

const CommentModel = new mongoose.Schema({
    commentContent: {type: String, required: true,},
    commentedBy: {type: String, default: 'Anonymous'},
    postID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
}, { timestamps: true} )

module.exports = mongoose.model("Comment", CommentModel)