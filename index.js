import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

let keys = [];

try {
  const data = fs.readFileSync('./keys.json', 'utf-8');
  keys = JSON.parse(data);
} catch (err) {
  console.error('Error loading keys:', err);
}

app.post('/api/checkkey', (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ error: 'No key provided' });

  const valid = keys.find(k => k === key);

  if (valid) {
    return res.json({ success: true, message: 'Key valid' });
  } else {
    return res.status(403).json({ success: false, message: 'Invalid or expired key' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
