import { Router } from 'express';
import supabase from '../supabase.js';

const router = Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { data, error } = await supabase.from('bookings').insert(req.body).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  const { data, error } = await supabase.from('bookings').update({ status }).eq('id', req.params.id).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
