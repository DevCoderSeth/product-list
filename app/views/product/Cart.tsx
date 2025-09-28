// app/views/product/Cart.tsx

"use client";

import { X } from "lucide-react";
import Btn from "../Btn";

interface CartItem {
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: { thumbnail: string };
}

interface CartProps {
  cartItems: CartItem[];
  onRemove: (name: string) => void;
  onConfirm: () => void;
}

export default function Cart({ cartItems, onRemove, onConfirm }: CartProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800">
        Your Cart ({totalItems})
      </h2>
      {totalItems === 0 ? (
        <div className="flex flex-col items-center mt-6">
          <img
            src="/illustration-empty-cart.svg"
            alt="Empty cart"
            className="w-32 h-32 mb-4"
          />
          <p className="text-gray-500 text-sm">
            Your products will appear here
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mt-4">
            {cartItems.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity}x @ ${item.price.toFixed(2)} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <Btn
                  onClick={() => onRemove(item.name)}
                  variant="ghost"
                  className="p-2"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <X className="w-5 h-5 text-red-500" />
                </Btn>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex justify-between font-semibold text-lg">
              <span>Order Total</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <img
                src="/icon-carbon-neutral.svg"
                alt="Carbon neutral"
                className="w-5 h-5"
              />
              <p className="text-sm text-green-600">
                This is a carbon neutral delivery
              </p>
            </div>
          </div>
          <Btn
            onClick={onConfirm}
            theme="btn-primary"
            className="w-full mt-4"
            rounded="full"
          >
            Confirm Order
          </Btn>
        </>
      )}
    </div>
  );
}
