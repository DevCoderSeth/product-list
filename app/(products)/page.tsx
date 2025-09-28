// app/(products)/page.tsx
"use client"

import { useState } from "react";
import Cart from "../views/product/Cart";
import ProductCard from "../views/product/ProductCard";

// Define the CartItem interface for TypeScript
interface CartItem {
  name: string;
  price: number;
  quantity: number;
  category?: string; // Optional, since mockProducts has category
}

const mockProducts = [
  {
    image: {
      thumbnail: "/image-waffle-thumbnail.jpg",
      mobile: "/image-waffle-mobile.jpg",
      tablet: "/image-waffle-tablet.jpg",
      desktop: "/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    image: {
      thumbnail: "/image-creme-brulee-thumbnail.jpg",
      mobile: "/image-creme-brulee-mobile.jpg",
      tablet: "/image-creme-brulee-tablet.jpg",
      desktop: "/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
];

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Handler to add or increment an item
  const handleAddOrIncrement = (product: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.name === product.name);
      if (existingItem) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Handler to decrement (or remove if quantity hits 0)
  const handleDecrement = (product: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.name === product.name);
      if (!existingItem) return prev;

      if (existingItem.quantity === 1) {
        return prev.filter((item) => item.name !== product.name);
      } else {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  // Handler to remove an item entirely
  const handleRemove = (productName: string) => {
    setCartItems((prev) => prev.filter((item) => item.name !== productName));
  };

  return (
    <main className="mx-auto my-16 space-y-4 max-w-6xl ">
      <div className="grid lg:flex gap-4">
        <div className="grid lg:flex gap-4">
          {mockProducts.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              onAddOrIncrement={handleAddOrIncrement}
              onDecrement={handleDecrement}
              cartItems={cartItems}
            />
          ))}
        </div>
        <Cart cartItems={cartItems} onRemove={handleRemove} />
      </div>
    </main>
  );
}
