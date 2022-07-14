const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");
const fetchuser = require("../middleware/fetchUser");
const authController = require("../controllers/authController");

// ROUTE 1: Create a user using: POST "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  authController.signup_post
);

// ROUTE 2: Authenticate a user using: POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  authController.login_post
);

// ROUTE 3: Get user using logged in details: POST "/api/auth/getuser"
router.post("/getuser", fetchuser, authController.getuser_post);

module.exports = router;
