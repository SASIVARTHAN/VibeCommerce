import { Router } from 'express';
import { Product } from '../storage/db.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const products = await Product.find({}, { _id: 0 }).lean();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

export default router;
