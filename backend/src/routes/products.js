import { Router } from 'express';
import { Product } from '../storage/db.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const products = await Product.find({}).select('id name price image').lean();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

export default router;
