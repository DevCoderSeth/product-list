// app/page.tsx

"use client";

import { useState } from "react";
import ProductCard from "./views/product/ProductCard";
import Cart from "./views/product/Cart";
import OrderCard from "./views/product/OrderCard";
import productsData from "./data/data.json";

interface Product {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

export default function ProductsPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showOrderCard, setShowOrderCard] = useState(false);

  const handleAdd = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) return prev; // Already added, use increment
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleIncrement = (product: Product) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrement = (product: Product) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (name: string) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  const handleConfirm = () => {
    setShowOrderCard(true);
  };

  const handleCloseOrder = () => {
    setShowOrderCard(false);
    setCartItems([]); // Clear cart after confirm
  };

  return (
    <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Desserts</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
          {productsData.map((product: Product) => (
            <ProductCard
              key={product.name}
              product={product}
              cartItems={cartItems}
              onAdd={handleAdd}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          ))}
        </div>
        <div className="lg:fixed lg:right-0 lg:top-0 lg:h-screen lg:w-1/3 lg:pt-8 lg:pb-8 lg:pr-8">
          <Cart
            cartItems={cartItems}
            onRemove={handleRemove}
            onConfirm={handleConfirm}
          />
        </div>
      </div>
      {showOrderCard && (
        <OrderCard cartItems={cartItems} onClose={handleCloseOrder} />
      )}
    </main>
  );
}
