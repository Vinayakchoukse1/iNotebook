const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");
const fetchuser = require("../middleware/fetchUser");

module.exports.signup_get = async (req, res) => {};

module.exports.signup_post = async (req, res) => {
  let success = false;

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {
    // Checking whether user exists or not
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "Email already exits" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Creating new User
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, secretKey);
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).send({ success, error: "Internal Server Error" });
  }
};

module.exports.login_get = async (req, res) => {};

module.exports.login_post = async (req, res) => {
  let success = false;

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Checking whether user exists or not
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, error: "Wrong Credentials" });
    }

    // Checking correct password
    const flag = await bcrypt.compare(password, user.password);
    if (!flag) {
      return res.status(400).json({ success, error: "Wrong Credentials" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, secretKey);
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).send({ success, error: "Internal Server Error" });
  }
};

module.exports.getuser_post = async (req, res) => {
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  };
};
