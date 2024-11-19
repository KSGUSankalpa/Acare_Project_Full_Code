require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User_login");
const Driver = require("../models/Driver");


// Secret key for JWT
const secretKey = process.env.JWT_SECRET;

// Signup Route
router.post("/signup", async (req, res) => {
  const { userid, name, email, password } = req.body;

  if (!userid || !name || !email || !password) {
    return res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  } else if (!/^[a-zA-Z]*$/.test(name)) {
    return res.json({
      status: "FAILED",
      message: "Invalid name entered!",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.json({
      status: "FAILED",
      message: "Invalid email entered!",
    });
  } else if (password.length < 8) {
    return res.json({
      status: "FAILED",
      message: "Password is too short!",
    });
  }

  try {
    // Check if user already exists in User collection
    const existingUser = await User.findOne({ userid });

    if (existingUser) {
      return res.json({
        status: "FAILED",
        message: "User already exists!",
      });
    }

    // Check if user exists in Drivers collection
    const driver = await Driver.findOne({ userid });

    if (!driver) {
      return res.json({
        status: "FAILED",
        message: "User is not a registered driver!",
      });
    }

    // Password handling
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userid,
      name,
      email,
      password: hashedPassword,
    });

    const result = await newUser.save();

    // Create JWT payload and sign token
    const payload = { user: { id: result.id } };
    jwt.sign(payload, secretKey, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({
        status: "SUCCESS",
        message: "Signup successful!",
        token,
      });
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: "An error occurred during signup!",
      error: error.message,
    });
  }
});

// Signin Route
router.post("/signin", async (req, res) => {
  const { userid, password } = req.body;

  if (!userid || !password) {
    return res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  }

  try {
    const user = await User.findOne({ userid });

    if (!user) {
      return res.json({
        status: "FAILED",
        message: "User not found!",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      
      // Create JWT payload and sign token
      const payload = { user: { id: user.id } };
      jwt.sign(payload, secretKey, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({
          status: "SUCCESS",
          message: "Signin successful!",
          token,
        });
      });
    } else {
      res.json({
        status: "FAILED",
        message: "Invalid password entered!",
      });
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: "An error occurred during signin!",
      error: error.message,
    });
  }
});

module.exports = router;
