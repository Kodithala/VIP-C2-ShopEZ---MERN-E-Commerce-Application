import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { isEmail, requireFields } from '../utils/validators.js';

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt
});

export const registerUser = async (req, res, next) => {
  try {
    const missing = requireFields(req.body, ['name', 'email', 'password']);
    if (missing) {
      res.status(400);
      throw new Error(missing);
    }

    const { name, email, password } = req.body;
    if (!isEmail(email)) {
      res.status(400);
      throw new Error('Please provide a valid email address');
    }
    if (password.length < 6) {
      res.status(400);
      throw new Error('Password must be at least 6 characters');
    }

    const exists = await User.findOne({ email });
    if (exists) {
      res.status(409);
      throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ ...sanitizeUser(user), token: generateToken(user._id) });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const missing = requireFields(req.body, ['email', 'password']);
    if (missing) {
      res.status(400);
      throw new Error(missing);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      return res.json({ ...sanitizeUser(user), token: generateToken(user._id) });
    }

    res.status(401);
    throw new Error('Invalid email or password');
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.email && !isEmail(req.body.email)) {
      res.status(400);
      throw new Error('Please provide a valid email address');
    }
    if (req.body.password) {
      if (req.body.password.length < 6) {
        res.status(400);
        throw new Error('Password must be at least 6 characters');
      }
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({ ...sanitizeUser(updatedUser), token: generateToken(updatedUser._id) });
  } catch (error) {
    next(error);
  }
};
