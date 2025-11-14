const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://annachu:annaichu@sddlcluster.yblin3v.mongodb.net/serendipitiesDB?retryWrites=true&w=majority&")

        console.log(`MongoDB is connected: ${conn.connection.host}`.cyan.underline);
    }catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB