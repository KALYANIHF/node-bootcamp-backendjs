const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected with the server ${mongoose.connection.host}`.green
        .underline.bold
    );
  } catch (error) {
    console.log(error).red.underline.bold;
    process.exit(1);
  }
};
module.exports = connectDB;
