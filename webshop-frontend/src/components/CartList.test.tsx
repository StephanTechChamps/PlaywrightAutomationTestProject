import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CartList from './CartList';
import type { CartItem as CartItemType, Currency } from '../types';

const mockCart: CartItemType[] = [
  {
    id: 1,
    name: 'Apple',
    quantity: 3,
    image: 'apple.jpg',
    price: 2,
  },
  {
    id: 2,
    name: 'Banana',
    quantity: 1,
    image: 'banana.jpg',
    price: 1,
  },
];

const mockCurrency: Currency = 'USD';
const mockRemoveFromCart = jest.fn();

describe('CartList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all cart items', () => {
    render(
      <CartList cart={mockCart} currency={mockCurrency} removeFromCart={mockRemoveFromCart} />
    );
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('calls removeFromCart with correct id when Remove button is clicked', () => {
    render(
      <CartList cart={mockCart} currency={mockCurrency} removeFromCart={mockRemoveFromCart} />
    );
    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
    fireEvent.click(removeButtons[1]);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(2);
  });

  it('renders correct quantity for each item', () => {
    render(
      <CartList cart={mockCart} currency={mockCurrency} removeFromCart={mockRemoveFromCart} />
    );
    expect(screen.getByText('(x 3)')).toBeInTheDocument();
    expect(screen.getByText('(x 1)')).toBeInTheDocument();
  });
});