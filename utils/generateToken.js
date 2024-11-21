import { JWT_SECRET } from '../config.js'; 
import jwt from 'jsonwebtoken';

// Generate Access Token
export const generateToken = (userId, userType) => {
  return jwt.sign(
    { 
      userId, userType 
    },
    JWT_SECRET, 
    { 
      expiresIn: '10d' 
    });
};
