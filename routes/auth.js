const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const { body } = require("express-validator");
const validationCheck = require("../middleware/validation");

const router = express.Router();

// Register
router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ],
  validationCheck,
  (req, res) => {
    const { name, email, password } = req.body;

    // validating input fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    User.findOne({ email }).then((existingUser) => {
      if (existingUser) {
        return res.status(200).json({
          message: "Email already exists",
        });
      }

      const saltRounds = 10;

      bcrypt
        .genSalt(saltRounds)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashPassword) =>
          User.create({ name, email, password: hashPassword })
        )
        .then((newUser) => {
          const token = JWT.sign(
            { userId: newUser._id },
            `${process.env.SECRET_KEY}`
          );
          res.status(201).json({
            message: "User Registration Successfully",
            data: token,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            message: "Something went wrong in Registration",
            error: error,
          });
        });
    });
  }
);

// Login
router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 8 })],
  validationCheck,
  (req, res) => {
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
      return res.status(400).json({
        error: "Missing Required Fields.",
      });
    }

    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(500).json({
            message: "Invalid Email or Password",
          });
        }
        return bcrypt.compare(password, user.password).then((isPassword) => {
          if (!isPassword) {
            return res.status(500).json({
              message: "Invalid Email or Password",
            });
          }
          const token = JWT.sign(
            { userId: user._id },
            `${process.env.SECRET_KEY}`
          );
          res.status(200).json({
            message: "Login Successfully.",
            data: token,
          });
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: error.message,
        });
      });
  }
);

module.exports = router;
