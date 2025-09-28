"use client";

import { X } from "lucide-react";
import Btn from "../Btn";

// Define props interface for TypeScript
interface CartItem {
  name: string;
  price: number;
  quantity: number;
  category?: string;
}

interface CartProps {
  cartItems: CartItem[];
  onRemove: (productName: string) => void;
}

export default function Cart({ cartItems, onRemove }: CartProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-xl font-bold text-gray-800">
        Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"} selected)
      </h2>

      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600">
                {item.quantity}x @${item.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => onRemove(item.name)} // Use product name
                className="text-gray-400 hover:text-red-500"
                aria-label="Remove item"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 space-y-2">
        <div className="flex justify-between text-lg font-semibold text-gray-800">
          <span>Total</span>
          <span>${totalCost}</span>
        </div>
        <p className="text-sm text-green-600">
          This is a carbon neutral delivery
        </p>
      </div>

      <Btn
        theme="btn-primary"
        className="w-full mt-4"
        rounded="md"
        textSize="lg"
      >
        Confirm Order
      </Btn>
    </div>
  );
}
