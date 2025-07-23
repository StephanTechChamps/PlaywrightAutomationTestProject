import React from 'react';
import { CartItem as CartItemType, Currency } from '../types';
import CartItem from './CartItem';

interface CartListProps {
  cart: CartItemType[];
  currency: Currency;
  removeFromCart: (productId: number) => void;
}

const CartList: React.FC<CartListProps> = ({ cart, currency, removeFromCart }) => (
  <ul>
    {cart.map(item => (
      <CartItem
        key={item.id}
        item={item}
        currency={currency}
        removeFromCart={removeFromCart}
      />
    ))}
  </ul>
);

export default CartList; 