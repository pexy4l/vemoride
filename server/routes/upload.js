import { Router } from 'express';
import multer from 'multer';
import supabase from '../supabase.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/:bucket', upload.single('file'), async (req, res) => {
  const { bucket } = req.params;
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file provided' });

  const fileName = `${Date.now()}_${file.originalname}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file.buffer, { contentType: file.mimetype });

  if (error) return res.status(400).json({ error: error.message });

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  res.json({ url: urlData.publicUrl });
});

export default router;
