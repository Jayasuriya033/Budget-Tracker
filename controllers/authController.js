import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.js'; 
const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  console.log(firstName, lastName, email, phone, password);
  

  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const existingUser = await prisma.appUser.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists.' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.appUser.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashed,
      }
    });

    res.status(201).json({ message: 'Registration successful.', userId: user.id, userEmail: user.email });
  } catch (err) {
    console.error('Registration error:', err); 
    res.status(500).json({ error: 'Server error during registration.' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = await prisma.appUser.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login.' });
  }
};
