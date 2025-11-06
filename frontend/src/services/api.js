const API_BASE = '/api';

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchCart() {
  const res = await fetch(`${API_BASE}/cart`);
  if (!res.ok) throw new Error('Failed to fetch cart');
  return res.json();
}

export async function addToCart(productId, qty = 1) {
  const res = await fetch(`${API_BASE}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, qty }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to add to cart' }));
    throw new Error(err.error || 'Failed to add to cart');
  }
  return res.json();
}

export async function removeFromCart(itemId) {
  const res = await fetch(`${API_BASE}/cart/${itemId}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to remove item' }));
    throw new Error(err.error || 'Failed to remove item');
  }
  // 204 No Content has no body, so don't try to parse JSON
  if (res.status === 204) {
    return;
  }
  return res.json();
}

export async function updateCartItem(itemId, qty) {
  const res = await fetch(`${API_BASE}/cart/${itemId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ qty }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to update cart' }));
    throw new Error(err.error || 'Failed to update cart');
  }
  return res.json();
}

export async function checkout(name, email) {
  const res = await fetch(`${API_BASE}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to checkout' }));
    throw new Error(err.error || 'Failed to checkout');
  }
  return res.json();
}

export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

