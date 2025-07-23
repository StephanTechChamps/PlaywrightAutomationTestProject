import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from './CartItem';
import type { CartItem as CartItemType, Currency } from '../types';

const mockItem: CartItemType = {
  id: 1,
  name: 'Test Product',
  quantity: 2,
  image: 'test-image.jpg',
    price: 10, 
};

const mockCurrency: Currency = 'USD';
const mockRemoveFromCart = jest.fn();

describe('CartItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product name, quantity, and price', () => {
    render(<CartItem item={mockItem} currency={mockCurrency} removeFromCart={mockRemoveFromCart} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('(x 2)')).toBeInTheDocument();
    expect(screen.getByText(/\$20.00|20.00 \$/)).toBeInTheDocument();
  });

  it('renders product image if present', () => {
    render(<CartItem item={mockItem} currency={mockCurrency} removeFromCart={mockRemoveFromCart} />);
    const img = screen.getByAltText('Test Product') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('test-image.jpg');
  });

  it('calls removeFromCart when Remove button is clicked', () => {
    render(<CartItem item={mockItem} currency={mockCurrency} removeFromCart={mockRemoveFromCart} />);
    fireEvent.click(screen.getByText('Remove'));
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it('does not render image if item.image is undefined', () => {
    const itemNoImage = { ...mockItem, image: undefined };
    render(<CartItem item={itemNoImage} currency={mockCurrency} removeFromCart={mockRemoveFromCart} />);
    expect(screen.queryByAltText('Test Product')).toBeNull();
  });
});
