import { useState, useEffect } from 'react';
import { fetchProducts, addToCart } from '../services/api';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddToCart(productId) {
    try {
      setAdding((prev) => ({ ...prev, [productId]: true }));
      await addToCart(productId, 1);
      // Show success feedback (could use a toast library)
      alert('Added to cart!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setAdding((prev) => ({ ...prev, [productId]: false }));
    }
  }

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="products-page">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">${(product.price / 100).toFixed(2)}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product.id)}
                disabled={adding[product.id]}
              >
                {adding[product.id] ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

