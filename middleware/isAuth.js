const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log("autHeader: ", authHeader)
    if(!authHeader) return res.status(401).json({success: false, message: "Unauthorized"})
    const token = authHeader.split(" ")[1];
    // console.log("token: ", token)
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        console.log(user)
        next()
    } catch (err) {
        return res.status(401).json({success: false, message: "Unauthorized"})
    }
}