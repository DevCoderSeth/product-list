// app/views/product/ProductButton.tsx

"use client";

import { Plus, Minus, ShoppingCart } from "lucide-react";
import Btn from "../Btn";

// Define props interface for TypeScript
interface ProductButtonProps {
  quantity: number;
  onAddOrIncrement: () => void;
  onDecrement: () => void;
}

export default function ProductButton({
  quantity,
  onAddOrIncrement,
  onDecrement,
}: ProductButtonProps) {
  return (
    <>
      {quantity === 0 ? (
        <Btn iconLeft={<ShoppingCart />} onClick={onAddOrIncrement}>
          Add to Cart
        </Btn>
      ) : (
        <div className="flex items-center gap-2">
          <Btn onClick={onDecrement} rounded="md" variant="secondary">
            <Minus />
          </Btn>
          <Btn>{quantity}</Btn>
          <Btn onClick={onAddOrIncrement} rounded="md" variant="secondary">
            <Plus />
          </Btn>
        </div>
      )}
    </>
  );
}
