import React from 'react';
import type { Product, CartItem, Currency } from '../types';
import ProductItem from './ProductItem';

interface ProductListProps {
  products: Product[];
  cart: CartItem[];
  currency: Currency;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, cart, currency, addToCart, removeFromCart }) => (
  <ul>
    {products.map(product => (
      <ProductItem
        key={product.id}
        product={product}
        cartItem={cart.find(item => item.id === product.id)}
        currency={currency}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    ))}
  </ul>
);

export default ProductList; 