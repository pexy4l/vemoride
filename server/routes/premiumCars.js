import { Router } from 'express';
import supabase from '../supabase.js';

const router = Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('premium_cars').select('*').order('created_at', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { data, error } = await supabase.from('premium_cars').insert(req.body).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.delete('/:id', async (req, res) => {
  const { error } = await supabase.from('premium_cars').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Deleted' });
});

export default router;
