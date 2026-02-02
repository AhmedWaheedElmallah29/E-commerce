import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  // Initialize cart from LocalStorage to persist data
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Sync cart with LocalStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // --- Cart Actions ---

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

  // Clears all items from the cart
  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
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
