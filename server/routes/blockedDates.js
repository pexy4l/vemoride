import { Router } from 'express';
import supabase from '../supabase.js';

const router = Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('blocked_dates').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/car/:carId', async (req, res) => {
  const { data, error } = await supabase.from('blocked_dates').select('blocked_date').eq('car_id', req.params.carId);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { data, error } = await supabase.from('blocked_dates').insert(req.body).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.delete('/:id', async (req, res) => {
  const { error } = await supabase.from('blocked_dates').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Deleted' });
});

export default router;
