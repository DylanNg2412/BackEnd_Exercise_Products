const express = require("express");

const router = express.Router();

const { loginUser, signUpUser } = require("../controllers/user");

//login route
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await loginUser(email, password);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// signup route
router.post("/signup", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    // create user via signUpUser
    const user = await signUpUser(name, email, password);
    // send back the newly created user data
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
