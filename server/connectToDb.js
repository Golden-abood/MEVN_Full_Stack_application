const mongoose = require("mongoose");

// connect with db
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to the databse");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  connectToDb,
};
