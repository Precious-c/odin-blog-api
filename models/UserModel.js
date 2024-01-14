const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, min: 4},
    email: {type: String, required: true, min: 5, unique: true},
    password: {type: String, required: true, min: 6},
    picture: {type: String, default: ''},
    // noOfPosts: {type: Number, default: 0 },
    // noOfPublishedPosts: {type: Number, default: 0 },
    // noOfUnpublishedPosts: {type: Number, default: 0 }
}, { timestamps: true} )

module.exports = mongoose.model("User", UserSchema)