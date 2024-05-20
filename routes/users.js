const mongoose = require("mongoose");

mongoose.connect(
  `process.env.MONGODB_URI`
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = new mongoose.model("User", userSchema);
