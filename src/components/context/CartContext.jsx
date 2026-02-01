import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  // 1. تهيئة السلة من الـ LocalStorage
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // 2. تحديث الـ LocalStorage كل ما السلة تتغير
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // --- الدوال (Actions) ---

  function addToCart(product, quantity) {
    setCart((prevCart) => {
      const isExist = prevCart.find((i) => i.id === product.id);
      if (isExist) {
        return prevCart.map((i) =>
          i.id === product.id
            ? {
                ...i,
                quantity: i.quantity + quantity,
              }
            : i,
        );
      }
      return [...prevCart, { ...product, quantity: quantity }];
    });
  }

  function increaseQuantity(id) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decreaseQuantity(id) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  // 👇👇 الدالة الجديدة: تفريغ السلة بالكامل 👇👇
  function clearCart() {
    setCart([]); // 1. فضي الـ State
    localStorage.removeItem("cart"); // 2. فضي الـ Storage
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
