import { Router } from 'express';
import supabase from '../supabase.js';

const router = Router();

router.post('/', async (req, res) => {
  const { data, error } = await supabase.from('contact_messages').insert(req.body).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
