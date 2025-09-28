// app/views/product/OrderCard.tsx

import Btn from "../Btn";

interface CartItem {
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: { thumbnail: string };
}

interface OrderCardProps {
  cartItems: CartItem[];
  onClose: () => void;
}

export default function OrderCard({ cartItems, onClose }: OrderCardProps) {
  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-fade-in">
        <img
          src="/icon-order-confirmed.svg"
          alt="Carbon neutral"
          className="w-10 h-10 mb-3"
        />
        <h2 className="text-xl font-bold text-gray-800">Order Confirmed</h2>
        <p className="text-gray-600 mt-2">We hope you enjoy your food!</p>
        <div className="space-y-4 mt-4">
          {cartItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-4 border-b py-2"
            >
              <img
                src={item.image.thumbnail}
                alt={item.name}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.quantity}x @ ${item.price.toFixed(2)}
                </p>
              </div>
              <p className="font-bold text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between font-semibold text-lg">
          <span>Order Total</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>
        <Btn
          onClick={onClose}
          theme="btn-primary"
          className="w-full mt-4"
          rounded="full"
        >
          Close
        </Btn>
      </div>
    </div>
  );
}
