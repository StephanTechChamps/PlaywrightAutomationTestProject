import type { Currency, Product } from './types';

export const EUR_TO_USD = 1.1;

export function formatPrice(price: number, currency: Currency) {
  if (currency === 'USD') {
    return `$${price.toFixed(2)}`;
  }
  return `€${price}`;
}

export function getUnitPrice(product: Product, currency: Currency) {
  if (currency === 'USD') {
    return parseFloat((product.price * EUR_TO_USD).toFixed(2));
  }
  return product.price;
} 