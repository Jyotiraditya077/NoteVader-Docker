// src/controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({ error: "User already exists or invalid data" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({
      token: generateToken(user._id),
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
