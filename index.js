import express from 'express';
const app = express();
app.use(express.json());

app.post('/api/checkkey', (req, res) => {
  res.json({ success: true, message: 'Route works' });
});

app.listen(3000, () => console.log('Server listening on 3000'));
