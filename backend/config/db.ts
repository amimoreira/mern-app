// backend\config\db.ts
const moogose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try {
        const conn = await moogose.connect(process.env.MONGO_URI);
        console.log(colors.cyan.underline(`MongoDB Connected: ${conn.connection.host}`));
    } catch (error) {   
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB