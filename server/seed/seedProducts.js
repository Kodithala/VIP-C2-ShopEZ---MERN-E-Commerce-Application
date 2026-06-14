import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ensureDefaultData } from './defaultData.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await ensureDefaultData();
    console.log('Seed data imported');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
