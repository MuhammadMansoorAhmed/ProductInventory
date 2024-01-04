const mongoose = require("mongoose")
require("dotenv").config()


const DbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDb");
    } catch (err) {
        console.error("DB Error", err.message);
    }
}
module.exports = DbConnect;