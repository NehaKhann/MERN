const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/mern_admin";
//mongoose.connect(URI);

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection successful to Database");
  } catch (error) {
    console.error("Database connection failed");
    process.exit(0);
  }
};
module.exports = connectDb;