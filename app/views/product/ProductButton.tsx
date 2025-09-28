// app/views/product/ProductButton.tsx

"use client";

import { ShoppingCart, Plus, Minus } from "lucide-react";
import Btn from "../Btn";

interface ProductButtonProps {
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function ProductButton({
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
}: ProductButtonProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {quantity === 0 ? (
        <Btn
          iconLeft={<ShoppingCart className="w-5 h-5" />}
          onClick={onAdd}
          theme="btn-outline"
          rounded="full"
          className="w-40"
        >
          Add to Cart
        </Btn>
      ) : (
        <>
          <Btn
            onClick={onDecrement}
            rounded="full"
            theme="btn-secondary"
            className="p-2"
          >
            <Minus className="w-4 h-4" />
          </Btn>
          <Btn cursorOnHover="false">{quantity}</Btn>
          <Btn
            onClick={onIncrement}
            rounded="full"
            theme="btn-secondary"
            className="p-2"
          >
            <Plus className="w-4 h-4" />
          </Btn>
        </>
      )}
    </div>
  );
}
