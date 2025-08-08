const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/checkkey', (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ success: false, message: 'No key provided' });

  // Just respond with key received for test
  res.json({ success: true, message: `Received key: ${key}` });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
