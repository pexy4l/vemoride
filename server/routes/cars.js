import { Router } from 'express';
import supabase from '../supabase.js';

const router = Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/available', async (req, res) => {
  const { data, error } = await supabase.from('cars').select('id, make, model, daily_rate').eq('status', 'Available');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/:id', async (req, res) => {
  const { data, error } = await supabase.from('cars').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { data, error } = await supabase.from('cars').insert(req.body).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.put('/:id', async (req, res) => {
  const { data, error } = await supabase.from('cars').update(req.body).eq('id', req.params.id).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.delete('/:id', async (req, res) => {
  const { error } = await supabase.from('cars').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Deleted' });
});

export default router;
