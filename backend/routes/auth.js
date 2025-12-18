// src/routes/auth.mjs
import express from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';
import rateLimit from 'express-rate-limit';
import User from '../models/Users.js';
import { signAccessToken } from '../utilities/token.js';
const router = express.Router();

// basic rate limiter for auth endpoints
// const authLimiter = rateLimit({
//   windowMs: 60 * 1000, // 1 min
//   max: 10,
//   message: { error: 'Too many attempts, try again later' }
// });
// router.use(authLimiter);



// signup
router.post('/signup', async (req, res) => {
  console.log("auth..signup.js");
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name)
      return res.status(400).json({ error: 'Missing fields' });

    // if (!validator.isEmail(email))
    //   return res.status(400).json({ error: 'Invalid email' });

    if (password.length < 8)
      return res.status(400).json({ error: 'Password too short' });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ error: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({ email, passwordHash, name, role });

    const token = signAccessToken({
      sub: user._id.toString(),
      role: user.role
    });

    return res.status(201).json({
      token,
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// login
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok)
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = signAccessToken({
      sub: user._id.toString(),
      role: user.role
    });

    return res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



// logout (stateless) - optional endpoint to let client call; server does nothing
router.post('/signout', (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  res.json({ ok: true, message: 'Logged out' });
});

export default router;
