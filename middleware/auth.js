const jwt = require("jsonwebtoken");

const { getUserByEmail } = require("../controllers/user");

const { JWT_PRIVATE_KEY } = require("../config");

// trigger get function from controller
const isUserValid = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // perform user validation
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    const user = await getUserByEmail(decoded.email);
    // if user exist
    if (user) {
      // this is a valid user
      // to pass the user object to the next function
      req.user = user;
      // to trigger the next function
      next();
    } else {
      // this is not a valid user
      res.status(403).send({
        message: "You are not authorize to perform this action",
      });
    }
  } catch (error) {
    // error
    res.status(403).send({
      message: "You are not authorize to perform this action",
    });
  }
};

// validate if the log in user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // perform user validation
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    const user = await getUserByEmail(decoded.email);
    // if user exist
    if (user && user.role === "admin") {
      // this is a valid user
      // to pass the user object to the next function
      req.user = user;
      // to trigger the next function
      next();
    } else {
      // this is not a valid user
      res.status(403).send({
        message: "You are not authorize to perform this action",
      });
    }
  } catch (error) {
    // error
    res.status(403).send({
      message: "You are not authorize to perform this action",
    });
  }
};

module.exports = {
  isUserValid,
  isAdmin,
};
