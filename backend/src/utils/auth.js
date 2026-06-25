import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';
import dotenv from 'dotenv';

dotenv.config();

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.encode(payload, process.env.JWT_SECRET);
};
