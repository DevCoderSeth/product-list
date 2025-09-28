import React from "react";
import ProductButton from "./ProductButton";
import { Product } from "@/app/types/product";

// Define props interface for TypeScript
interface ProductCardProps {
  product: Product;
  cartItems: CartItem[];
  onAddOrIncrement: (product: Product) => void;
  onDecrement: (product: Product) => void;
}

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  category?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartItems,
  onAddOrIncrement,
  onDecrement,
}) => {
  if (!product) return null; // Optional: skip rendering if no data yet

  const { image, name, category, price } = product;

  // Calculate quantity for this product
  const quantity = cartItems.find((item) => item.name === name)?.quantity || 0;

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden flex gap-4 flex-col">
      <picture className="w-full">
        <source media="(min-width: 1024px)" srcSet={image.desktop} />
        <source media="(min-width: 768px)" srcSet={image.tablet} />
        <source media="(max-width: 767px)" srcSet={image.mobile} />
        <img
          src={image.thumbnail}
          alt={name}
          className="w-full h-auto rounded-md"
        />
      </picture>

      <div className="-mt-9 flex items-center justify-center">
        <ProductButton
          quantity={quantity}
          onAddOrIncrement={() => onAddOrIncrement(product)} // Pass product to handler
          onDecrement={() => onDecrement(product)}
        />
      </div>

      <div className="p-2">
        <p className="text-sm text-gray-500">{category}</p>
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-md font-bold text-gray-900 mt-1">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
