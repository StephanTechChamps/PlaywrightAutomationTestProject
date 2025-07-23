import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import turtlesMug from './image/turtles mug.jpg';
import thundercatsTshirt from './image/thundercat t shirt.webp';
import superManSticker from './image/superman sticker.webp';
import KnightMug from './image/knight rider mug.webp';
import type { CartItem, Currency, Product } from './types';
import { formatPrice, getUnitPrice } from './utils';
import CurrencySwitch from './components/CurrencySwitch';
import ProductList from './components/ProductList';
import CartList from './components/CartList';

const PRODUCTS: Product[] = [
  { id: 1, name: 'ThunderShirt', price: 20, image: thundercatsTshirt },
  { id: 2, name: 'TurtleMug', price: 10, image: turtlesMug },
  { id: 3, name: 'SuperSticker', price: 2.2, image: superManSticker },
  { id: 4, name: 'KnightMug', price: 15, image: KnightMug },
];

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<Currency>('EUR');

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove one quantity, or remove item if quantity is 1
  const removeFromCart = (productId: number) => {
    setCart((prev) =>
      prev.flatMap((item) =>
        item.id === productId
          ? item.quantity > 1
            ? [{ ...item, quantity: item.quantity - 1 }]
            : []
          : [item]
      )
    );
  };

  function ProductsPage() {
    return (
      <div>
        <CurrencySwitch currency={currency} setCurrency={setCurrency} />
        <div style={{ marginBottom: 24 }}>
          <h2>Products</h2>
        </div>
        <ProductList
          products={PRODUCTS}
          cart={cart}
          currency={currency}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
        <Link to="/cart" style={{ display: 'inline-block', marginTop: 16 }}>
          Go to Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </Link>
      </div>
    );
  }

  function CartPage() {
    const navigate = useNavigate();
    const total = cart.reduce((sum, item) => sum + getUnitPrice(item, currency) * item.quantity, 0);
    return (
      <div>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <CartList cart={cart} currency={currency} removeFromCart={removeFromCart} />
            <div style={{ textAlign: 'right', fontWeight: 600, fontSize: 18, marginTop: 16 }}>
              Total: {formatPrice(total, currency)}
            </div>
          </>
        )}
        <button onClick={() => navigate('/')}>Back to Products</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Stephan's Webshop</h1>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
