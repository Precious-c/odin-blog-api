const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports = {
    register: async (req, res) => {
        try{
            const userExists = await User.findOne({email: req.body.email})
            if(userExists) return res.status(400).json({success: false, message: "User already exists"})
            req.body.password = await bcrypt.hash(req.body.password, 10)
            const user = await User.create(req.body)
            console.log(user)
            return res.status(200).json({success: true, user,})
        } catch(err) {
            console.log(err)
            return res.status(400).json({success: false, err})
        }
    },
    login: async (req, res) => {
        try{
            const user = await User.findOne({email: req.body.email})
            if(!user) return res.status(404).json({success: false, message: "User not found"})
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            console.log(isMatch)
            if(!isMatch) return res.status(401).json({success: false, message:"Password is incorrect"})
            const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '1h'})
            return res.status(200).json({success: true, user, token})
        } catch(err){
            console.log(err)
            return res.status(500).json({success: false, err})
        }
    }, 
    logout: async (req, res) => {

    } 
}