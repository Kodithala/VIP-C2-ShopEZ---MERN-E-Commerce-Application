import User from '../models/User.js';
import { isEmail, requireFields } from '../utils/validators.js';

export const getUsers = async (_req, res, next) => {
  try {
    res.json(await User.find({}).select('-password').sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const missing = requireFields(req.body, ['name', 'email', 'password']);
    if (missing) {
      res.status(400);
      throw new Error(missing);
    }

    const { name, email, password, role = 'USER' } = req.body;
    if (!isEmail(email)) {
      res.status(400);
      throw new Error('Please provide a valid email address');
    }
    if (password.length < 6) {
      res.status(400);
      throw new Error('Password must be at least 6 characters');
    }
    if (!['USER', 'ADMIN'].includes(role)) {
      res.status(400);
      throw new Error('Invalid user role');
    }

    const exists = await User.findOne({ email });
    if (exists) {
      res.status(409);
      throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (req.body.email && !isEmail(req.body.email)) {
      res.status(400);
      throw new Error('Please provide a valid email address');
    }
    if (req.body.role && !['USER', 'ADMIN'].includes(req.body.role)) {
      res.status(400);
      throw new Error('Invalid user role');
    }
    if (user._id.equals(req.user._id) && req.body.role && req.body.role !== 'ADMIN') {
      res.status(400);
      throw new Error('You cannot remove your own admin role');
    }

    user.name = req.body.name ?? user.name;
    user.email = req.body.email ?? user.email;
    user.role = req.body.role ?? user.role;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    if (user._id.equals(req.user._id)) {
      res.status(400);
      throw new Error('You cannot delete your own account');
    }

    await user.deleteOne();
    res.json({ message: 'User removed' });
  } catch (error) {
    next(error);
  }
};
