import { Router } from 'express';
import { z } from 'zod';
import { CartItem, Product } from '../storage/db.js';

const router = Router();

const checkoutSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

router.post('/', async (req, res, next) => {
  try {
    const parsed = checkoutSchema.parse(req.body);
    
    const cartItems = await CartItem.find({}).lean();
    
    // Populate product details
    const items = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findOne({ id: item.productId }).lean();
        if (!product) return null;
        const lineTotal = item.qty * product.price;
        return {
          id: item.id,
          productId: item.productId,
          qty: item.qty,
          name: product.name,
          price: product.price,
          lineTotal
        };
      })
    );

    const validItems = items.filter(item => item !== null);
    const total = validItems.reduce((sum, it) => sum + it.lineTotal, 0);
    const timestamp = new Date().toISOString();

    // Clear cart after checkout (mock)
    await CartItem.deleteMany({});

    return res.json({
      receipt: {
        customer: { name: parsed.name, email: parsed.email },
        items: validItems,
        total,
        timestamp
      }
    });
  } catch (err) {
    err.status = 400;
    return next(err);
  }
});

export default router;
