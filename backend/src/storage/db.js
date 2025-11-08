import mongoose from 'mongoose';

// MongoDB connection string - replace <db_password> with your actual password
const DEFAULT_URI = 'mongodb+srv://sasivarthankg_db_user:<db_password>@psna.g7iqowl.mongodb.net/vibe_cart?retryWrites=true&w=majority';
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_URI;

let isConnected = false;

export async function connectDb() {
  if (isConnected) {
    return;
  }

  try {
    // Replace <db_password> placeholder if it exists
    let connectionString = MONGODB_URI.replace('<db_password>', process.env.DB_PASSWORD || '');
    
    // URL encode the password if it contains special characters
    if (process.env.DB_PASSWORD) {
      const password = process.env.DB_PASSWORD;
      connectionString = connectionString.replace(`:${password}@`, `:${encodeURIComponent(password)}@`);
    }
    
    await mongoose.connect(connectionString);
    isConnected = true;
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
}

// Product Schema - use _id as the primary key, id as a regular field
const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }, // stored in cents
  image: { type: String }
});

export const Product = mongoose.model('Product', productSchema);

// Cart Item Schema - use _id as the primary key, id as a regular field
const cartItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  productId: { type: String, required: true, ref: 'Product' },
  qty: { type: Number, required: true, min: 1 }
});

export const CartItem = mongoose.model('CartItem', cartItemSchema);

// Seed products if collection is empty
export async function seedProducts() {
  const count = await Product.countDocuments();
  if (count === 0) {
    const products = [
      { id: 'p1', name: 'Vibe T-Shirt', price: 1999, image: 'https://picsum.photos/seed/vibe1/400/300' },
      { id: 'p2', name: 'Vibe Hoodie', price: 4999, image: 'https://picsum.photos/seed/vibe2/400/300' },
      { id: 'p3', name: 'Vibe Cap', price: 1499, image: 'https://picsum.photos/seed/vibe3/400/300' },
      { id: 'p4', name: 'Vibe Socks', price: 999, image: 'https://picsum.photos/seed/vibe4/400/300' },
      { id: 'p5', name: 'Vibe Mug', price: 1299, image: 'https://picsum.photos/seed/vibe5/400/300' },
      { id: 'p6', name: 'Vibe Tote', price: 2499, image: 'https://picsum.photos/seed/vibe6/400/300' }
    ];
    await Product.insertMany(products);
    // eslint-disable-next-line no-console
    console.log('Seeded products to MongoDB');
  }
}

export function toDollars(cents) {
  return Math.round(cents) / 100;
}
