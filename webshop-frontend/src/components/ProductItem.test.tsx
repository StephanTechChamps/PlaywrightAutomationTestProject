import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductItem from './ProductItem';
import type { Product, CartItem } from '../types';

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  image: 'test-product.jpg',
  price: 10,
};

const mockCartItem: CartItem = {
  id: 1,
  name: 'Test Product',
  image: 'test-product.jpg',
  price: 10,
  quantity: 2,
};

const mockCurrency = 'USD';
const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();

describe('ProductItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product name, image, and price', () => {
    render(
      <ProductItem
        product={mockProduct}
        currency={mockCurrency}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
      />
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
    // Price formatting may vary, so use regex
    expect(screen.getByText(/\$10.00|10.00 \$/)).toBeInTheDocument();
  });

  it('calls addToCart when Add to Cart button is clicked', () => {
    render(
      <ProductItem
        product={mockProduct}
        currency={mockCurrency}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
      />
    );
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('renders Remove button and quantity when cartItem is present and quantity > 0', () => {
    render(
      <ProductItem
        product={mockProduct}
        cartItem={mockCartItem}
        currency={mockCurrency}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
      />
    );
    expect(screen.getByText('Remove')).toBeInTheDocument();
    expect(screen.getByText('2 items added')).toBeInTheDocument();
  });

  it('calls removeFromCart with product id when Remove button is clicked', () => {
    render(
      <ProductItem
        product={mockProduct}
        cartItem={mockCartItem}
        currency={mockCurrency}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
      />
    );
    fireEvent.click(screen.getByText('Remove'));
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it('shows "1 item added" when cartItem.quantity is 1', () => {
    render(
      <ProductItem
        product={mockProduct}
        cartItem={{ ...mockCartItem, quantity: 1 }}
        currency={mockCurrency}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
      />
    );
    expect(screen.getByText('1 item added')).toBeInTheDocument();
  });

  it('does not render Remove button or quantity if cartItem is undefined or quantity is 0', () => {
    render(
      <ProductItem
        product={mockProduct}
        currency={mockCurrency}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
      />
    );
    expect(screen.queryByText('Remove')).toBeNull();
    expect(screen.queryByText(/item added/)).toBeNull();

    render(
      <ProductItem
        product={mockProduct}
        cartItem={{ ...mockCartItem, quantity: 0 }}
        currency={mockCurrency}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
      />
    );
    expect(screen.queryByText('Remove')).toBeNull()
    expect(screen.queryByText(/item added/)).toBeNull();
    });
});
