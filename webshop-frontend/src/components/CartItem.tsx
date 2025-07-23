import React from 'react';
import type { CartItem as CartItemType, Currency } from '../types';
import { formatPrice, getUnitPrice } from '../utils';

interface CartItemProps {
  item: CartItemType;
  currency: Currency;
  removeFromCart: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, currency, removeFromCart }) => (
  <li style={{ display: 'flex', alignItems: 'center', marginBottom: 24, gap: 16, padding: '12px 0', borderBottom: '1px solid #eee', minHeight: 70 }}>
    {item.image && (
      <img
        src={item.image}
        alt={item.name}
        style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
      />
    )}
    <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <span style={{ fontWeight: 500, fontSize: 16, flex: 1 }}>{item.name} <span style={{ color: '#888', fontSize: 15 }}>(x {item.quantity})</span></span>
      <span style={{ color: '#888', fontSize: 15, minWidth: 60, textAlign: 'right' }}>{formatPrice(getUnitPrice(item, currency) * item.quantity, currency)}</span>
    </div>
    <button style={{ minWidth: 90, marginLeft: 8 }} onClick={() => removeFromCart(item.id)}>
      Remove
    </button>
  </li>
);

export default CartItem; 