const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { JWT_PRIVATE_KEY } = require("../config");

const getUserByEmail = async (email) => {
  // find one user with the provided email
  const user = await User.findOne({ email: email });
  return user;
};

const generateTokenForUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    JWT_PRIVATE_KEY,
    {
      expiresIn: "30d", // 30 days
    }
  );
};

// login user
const loginUser = async (email, password) => {
  // check if user exist or nah
  const user = await getUserByEmail(email);

  // 2. if user don't exist, return error
  if (!user) {
    throw new Error("Invalid email");
  }

  // 3. check if password match or nah
  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }

  // 4. generate JWT token
  const token = generateTokenForUser(user);
  console.log(token);

  // 5. return back the user data
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: token,
  };
};

// create user
const signUpUser = async (name, email, password) => {
  //! 1. check if email alrd exist or not
  const email_exists = await getUserByEmail(email);
  if (email_exists) throw new Error("Email already exist");

  // 2. create a new user
  const newUser = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10), // hash the password
  });

  // 3. save the data
  await newUser.save();

  // 4. generate token
  const token = generateTokenForUser(newUser);

  // 5. return the user data
  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    token: token,
  };
};

module.exports = {
  getUserByEmail,
  loginUser,
  signUpUser,
};
