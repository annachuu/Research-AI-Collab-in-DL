const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://abbaspirmorady:YAlw4mOEwHvN9GlE@cluster0.rtlab.mongodb.net/serendipitiesDB")

        console.log(`MongoDB is connected: ${conn.connection.host}`.cyan.underline);
    }catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB