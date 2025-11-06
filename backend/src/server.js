import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDb, seedProducts } from './storage/db.js';
import productsRouter from './routes/products.js';
import cartRouter from './routes/cart.js';
import checkoutRouter from './routes/checkout.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB and seed products
(async () => {
  try {
    await connectDb();
    await seedProducts();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to initialize database:', error.message);
    // eslint-disable-next-line no-console
    console.error('Please check your MongoDB connection string and ensure DB_PASSWORD is set if needed');
    process.exit(1);
  }
})();

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', db: 'mongodb' });
});

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log('Using MongoDB database');
});
