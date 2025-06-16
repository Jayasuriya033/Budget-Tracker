import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '1d' });
};


