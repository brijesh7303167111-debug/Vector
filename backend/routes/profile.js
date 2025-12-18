// src/routes/profile.mjs
import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import Users from '../models/Users.js';
const router = express.Router();

router.get('/me', requireAuth, async (req, res) => {
  const user = await Users.findById(req.user.id).select('-passwordHash').lean();
  console.log(user);
  res.json({ user });
});

export default router;
