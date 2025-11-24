import express from 'express';
import productsRouter from './products/routes/productsRouter';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
  console.log(`ping GET: http://localhost:${PORT}/api/ping`);
  console.log(`products GET: http://localhost:${PORT}/api/products`);
});
