import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from './ProductList';
import type { Product, CartItem, Currency } from '../types';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Apple',
    image: 'apple.jpg',
    price: 2,
  },
  {
    id: 2,
    name: 'Banana',
    image: 'banana.jpg',
    price: 1,
  },
];

const mockCart: CartItem[] = [
  {
    id: 1,
    name: 'Apple',
    image: 'apple.jpg',
    price: 2,
    quantity: 3,
  },
];

const mockCurrency: Currency = 'USD';
const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();

describe('ProductList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all products', () => {
    render(
      <ProductList
        products={mockProducts}
        cart={mockCart}
        currency={mockCurrency}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
      />
    );
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('passes correct cartItem to ProductItem', () => {
    render(
      <ProductList
        products={mockProducts}
        cart={mockCart}
        currency={mockCurrency}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
      />
    );
    expect(screen.getByText('3 items added')).toBeInTheDocument();
    expect(screen.queryByText('1 item added')).toBeNull();
  });

  it('calls addToCart and removeFromCart with correct arguments', () => {
    render(
      <ProductList
        products={mockProducts}
        cart={mockCart}
        currency={mockCurrency}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
      />
    );
    fireEvent.click(screen.getAllByText('Add to Cart')[0]);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0]);
    fireEvent.click(screen.getByText('Remove'));
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });
});