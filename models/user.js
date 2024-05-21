const mongoose = require("mongoose");
const { Schema, model } = mongoose;

/*
    user fields:
    name
    email
    password
    roles (user n admin)
*/
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = model("User", userSchema);

module.exports = User;
