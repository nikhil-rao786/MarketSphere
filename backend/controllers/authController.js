
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: 'User already exists. Please login.'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    const message = `
      <h2>Welcome to ShopNest, ${name}!</h2>
      <p>Thank you for registering on our platform.</p>
      <p>Your verification OTP is:
      <strong>${otp}</strong></p>
    `;

    // Send email before creating account
    await sendEmail({
      email,
      subject: 'Welcome to ShopNest - Your OTP',
      message
    });

    // Create user only after email succeeds
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      message: 'Registration successful. OTP sent to your email.'
    });

  } catch (error) {
    console.error('Registration Error:', error);

    return res.status(500).json({
      message: 'Registration failed. Please try again.'
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    }

    return res.status(401).json({
      message: 'Invalid email or password'
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

// GET ALL USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers
};
