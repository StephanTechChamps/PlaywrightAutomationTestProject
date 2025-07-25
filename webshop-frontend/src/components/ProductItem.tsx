import React from 'react';
import type { Product, CartItem } from '../types';
import { formatPrice, getUnitPrice } from '../utils';

interface ProductItemProps {
  product: Product;
  cartItem?: CartItem;
  currency: 'EUR' | 'USD';
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, cartItem, currency, addToCart, removeFromCart }) => (
  <li style={{ display: 'flex', alignItems: 'center', marginBottom: 24, gap: 16, padding: '18px 0', borderBottom: '1px solid #eee', minHeight: 90 }} data-testid='productRow'>
    {product.image && (
      <img
        src={product.image}
        alt={product.name}
        style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
      />
    )}
    <div style={{ flex: 1, display: 'flex', alignItems: 'center' }} >
      <span style={{ fontWeight: 500, fontSize: 16, flex: 1 }} data-testid="productName">{product.name}</span>
      <span style={{ color: '#888', fontSize: 15, minWidth: 60, textAlign: 'right' }} data-testid="productPrice">{formatPrice(getUnitPrice(product, currency), currency)}</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
      <button data-testid={"addToCartButton"} style={{ minWidth: 110 }} onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <span style={{ display: 'inline-block', width: 52, marginLeft: 8 }}>
        {cartItem && cartItem.quantity > 0 && (
          <button data-testid="removeFromCartButton"
            style={{ width:80, background: '#fff', color: '#d00', border: '1px solid #d00', borderRadius: 3, cursor: 'pointer', height: 38, fontSize: 13 }}
            onClick={() => removeFromCart(product.id)}
          >
            Remove
          </button>
        )}
      </span>
    </div>
    <div style={{ height: 20, marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 110 }}>
      {cartItem && cartItem.quantity > 0 && (
        <span style={{ fontSize: 11, color: '#bbb', minWidth: 18, textAlign: 'center' }} data-testid="cartItemQuantity">
          {cartItem.quantity === 1 ? '1 item added' : `${cartItem.quantity} items added`}
        </span>
      )}
    </div>
  </li>
);

export default ProductItem; 