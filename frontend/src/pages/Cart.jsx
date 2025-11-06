import { useState, useEffect } from 'react';
import { fetchCart, removeFromCart, updateCartItem, checkout, formatPrice } from '../services/api';
import CheckoutModal from '../components/CheckoutModal';
import './Cart.css';

function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCart();
      setCart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(itemId) {
    try {
      await removeFromCart(itemId);
      await loadCart();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  }

  async function handleUpdateQty(itemId, newQty) {
    if (newQty < 1) {
      handleRemove(itemId);
      return;
    }
    try {
      setUpdating((prev) => ({ ...prev, [itemId]: true }));
      await updateCartItem(itemId, newQty);
      await loadCart();
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setUpdating((prev) => ({ ...prev, [itemId]: false }));
    }
  }

  async function handleCheckoutSuccess() {
    setShowCheckout(false);
    await loadCart();
  }

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (cart.items.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <a href="/">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-content">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} />
              </div>
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-price">{formatPrice(item.price)}</p>
              </div>
              <div className="cart-item-qty">
                <label>Qty:</label>
                <div className="qty-controls">
                  <button
                    onClick={() => handleUpdateQty(item.id, item.qty - 1)}
                    disabled={updating[item.id]}
                  >
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => handleUpdateQty(item.id, item.qty + 1)}
                    disabled={updating[item.id]}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="cart-item-total">
                <strong>{formatPrice(item.lineTotal)}</strong>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.id)}
                title="Remove item"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>{formatPrice(cart.total)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>{formatPrice(cart.total)}</span>
          </div>
          <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
            Proceed to Checkout
          </button>
        </div>
      </div>
      {showCheckout && (
        <CheckoutModal
          total={cart.total}
          onClose={() => setShowCheckout(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}
    </div>
  );
}

export default Cart;

