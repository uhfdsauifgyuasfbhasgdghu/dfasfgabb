const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

let keys = [];
try {
  const data = fs.readFileSync('./keys.json', 'utf8');
  keys = JSON.parse(data);
  if (Array.isArray(keys.keys)) {
    keys = keys.keys;
  }
} catch (e) {
  console.error('Failed to load keys:', e);
}

app.post('/api/checkkey', (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ success: false, message: 'No key provided' });

  if (keys.includes(key)) {
    return res.json({ success: true, message: 'Key valid' });
  } else {
    return res.status(403).json({ success: false, message: 'Invalid or expired key' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
