import { useState } from 'react';
import { checkout, formatPrice } from '../services/api';
import './CheckoutModal.css';

function CheckoutModal({ total, onClose, onSuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await checkout(formData.name, formData.email);
      setReceipt(result.receipt);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    if (receipt) {
      onSuccess();
    } else {
      onClose();
    }
  }

  if (receipt) {
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content receipt" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={handleClose}>×</button>
          <div className="receipt-content">
            <h2>Order Confirmed!</h2>
            <div className="receipt-section">
              <h3>Customer Information</h3>
              <p><strong>Name:</strong> {receipt.customer.name}</p>
              <p><strong>Email:</strong> {receipt.customer.email}</p>
            </div>
            <div className="receipt-section">
              <h3>Order Items</h3>
              <div className="receipt-items">
                {receipt.items.map((item) => (
                  <div key={item.id} className="receipt-item">
                    <span>{item.name} × {item.qty}</span>
                    <span>{formatPrice(item.lineTotal)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="receipt-section">
              <div className="receipt-total">
                <span><strong>Total:</strong></span>
                <span><strong>{formatPrice(receipt.total)}</strong></span>
              </div>
            </div>
            <div className="receipt-section">
              <p className="receipt-timestamp">
                <strong>Order Date:</strong> {new Date(receipt.timestamp).toLocaleString()}
              </p>
            </div>
            <button className="receipt-close-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={loading}
            />
          </div>
          <div className="checkout-total">
            <span>Total:</span>
            <span>{formatPrice(total)}</span>
          </div>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Complete Order'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;

