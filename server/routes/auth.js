import { Router } from 'express';
import supabase from '../supabase.js';

const router = Router();

router.post('/signup', async (req, res) => {
  const { email, password, options } = req.body;
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    ...options,
  });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: error.message });
  res.json(data);
});

router.post('/signout', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    await supabase.auth.admin.signOut(token);
  }
  res.json({ message: 'Signed out' });
});

router.get('/session', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token provided' });

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error) return res.status(401).json({ error: error.message });
  res.json({ user });
});

export default router;
