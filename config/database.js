const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_STRING)
        console.log(`MongoDB connected ${mongoose.connection.host}`)
    } catch(err) {
        console.error(err)
    }
}

module.exports = connectDB