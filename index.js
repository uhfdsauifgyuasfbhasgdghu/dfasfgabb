import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;
const keysFile = './keys.json';

app.use(express.json());

function readKeys() {
  try {
    const data = fs.readFileSync(keysFile, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeKeys(keys) {
  fs.writeFileSync(keysFile, JSON.stringify(keys, null, 2));
}

app.get('/check', (req, res) => {
  const key = req.query.key;
  if (!key) return res.json({ valid: false, message: 'No key provided' });

  const keys = readKeys();
  const keyObj = keys.find(k => k.key === key);

  if (!keyObj) return res.json({ valid: false, message: 'Invalid key' });
  if (keyObj.used) return res.json({ valid: false, message: 'Key already used' });

  res.json({ valid: true, message: 'Key is valid' });
});

app.post('/redeem', (req, res) => {
  const key = req.body.key;
  if (!key) return res.json({ success: false, message: 'No key provided' });

  const keys = readKeys();
  const keyObj = keys.find(k => k.key === key);

  if (!keyObj) return res.json({ success: false, message: 'Invalid key' });
  if (keyObj.used) return res.json({ success: false, message: 'Key already redeemed' });

  keyObj.used = true;
  writeKeys(keys);
  res.json({ success: true, message: 'Key redeemed' });
});

app.listen(port, () => {
  console.log(`Key server running on port ${port}`);
});
