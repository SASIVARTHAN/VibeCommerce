import { Router } from 'express';
import { z } from 'zod';
import { CartItem, Product } from '../storage/db.js';

const router = Router();

const addSchema = z.object({
  productId: z.string().min(1),
  qty: z.number().int().positive()
});

router.get('/', async (_req, res, next) => {
  try {
    const cartItems = await CartItem.find({}).lean();
    
    // Populate product details
    const items = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findOne({ id: item.productId }).lean();
        if (!product) {
          // If product not found, remove the cart item
          await CartItem.deleteOne({ id: item.id });
          return null;
        }
        const lineTotal = item.qty * product.price;
        return {
          id: item.id,
          productId: item.productId,
          qty: item.qty,
          name: product.name,
          price: product.price,
          image: product.image,
          lineTotal
        };
      })
    );

    const validItems = items.filter(item => item !== null);
    const total = validItems.reduce((sum, it) => sum + it.lineTotal, 0);
    res.json({ items: validItems, total });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const parsed = addSchema.parse(req.body);
    
    // Check if product exists
    const product = await Product.findOne({ id: parsed.productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const existing = await CartItem.findOne({ productId: parsed.productId });
    if (existing) {
      const newQty = existing.qty + parsed.qty;
      await CartItem.updateOne({ id: existing.id }, { qty: newQty });
      return res.status(200).json({ id: existing.id, productId: parsed.productId, qty: newQty });
    }

    const id = `ci_${Date.now()}`;
    await CartItem.create({ id, productId: parsed.productId, qty: parsed.qty });
    return res.status(201).json({ id, productId: parsed.productId, qty: parsed.qty });
  } catch (err) {
    err.status = 400;
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await CartItem.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const qty = z.number().int().positive().parse(req.body?.qty);
    const result = await CartItem.updateOne({ id: req.params.id }, { qty });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    return res.json({ id: req.params.id, qty });
  } catch (err) {
    err.status = 400;
    return next(err);
  }
});

export default router;
