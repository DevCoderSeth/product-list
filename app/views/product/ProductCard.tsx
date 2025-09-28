// app/views/product/ProductCard.tsx

import ProductButton from "./ProductButton";

interface Product {
  image: { thumbnail: string; mobile: string; tablet: string; desktop: string };
  name: string;
  category: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface ProductCardProps {
  product: Product;
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onIncrement: (product: Product) => void;
  onDecrement: (product: Product) => void;
}

export default function ProductCard({
  product,
  cartItems,
  onAdd,
  onIncrement,
  onDecrement,
}: ProductCardProps) {
  const quantity =
    cartItems.find((item) => item.name === product.name)?.quantity || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <picture>
        <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
        <source media="(min-width: 640px)" srcSet={product.image.tablet} />
        <source media="(max-width: 639px)" srcSet={product.image.mobile} />
        <img
          src={product.image.thumbnail}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </picture>
      <div className="p-4">
        <p className="text-sm text-gray-500">{product.category}</p>
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-md font-bold text-rose-600">
          ${product.price.toFixed(2)}
        </p>
        <div className="mt-4 flex justify-center">
          <ProductButton
            quantity={quantity}
            onAdd={() => onAdd(product)}
            onIncrement={() => onIncrement(product)}
            onDecrement={() => onDecrement(product)}
          />
        </div>
      </div>
    </div>
  );
}
