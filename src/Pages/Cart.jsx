import { useContext } from "react";
import { CartContext } from "../components/context/CartContext";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";

function Cart() {
  // هنجيب الداتا والوظائف من الصندوق
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  // حساب الإجمالي
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // 1. حالة لو العربة فاضية
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <div className="bg-white p-8 rounded-full shadow-lg mb-6">
          <ShoppingBag className="w-16 h-16 text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Go ahead and
          explore our top categories.
        </p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // 2. حالة لو فيه منتجات
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          Shopping Cart
          <span className="text-lg font-normal text-gray-500 bg-white px-3 py-1 rounded-full border">
            {cart.length} Items
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* قسم المنتجات (Left Side) */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 sm:gap-6 items-center hover:shadow-md transition-shadow"
              >
                {/* صورة المنتج */}
                <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={item.thumbnail || item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* تفاصيل المنتج */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  <div className="text-blue-600 font-bold text-xl">
                    price: ${item.price.toFixed(2)}
                  </div>
                  <div className="text-blue-600 font-bold text-xl">
                    total price: ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                {/* أزرار التحكم في الكمية */}
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-gray-800 w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-100 text-green-600 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* زرار الحذف */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1 text-red-500 text-sm hover:text-red-700 font-medium transition-colors"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ملخص الفاتورة (Right Side) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (Estimate)</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="h-px bg-gray-200 my-4"></div>
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-1">
                Checkout Now
              </button>

              <Link
                to="/products"
                className="block text-center mt-4 text-gray-500 hover:text-gray-800 text-sm flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
