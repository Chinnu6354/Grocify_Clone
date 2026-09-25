import { createContext, useEffect, useState } from "react";
import { getCart } from "../services/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const loadCartCount = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setCartCount(0);
        return;
      }

      const response = await getCart();

      const items = response.data?.items || [];

      const totalQuantity = items.reduce(
        (total, item) => total + item.quantity,
        0
      );

      setCartCount(totalQuantity);
    } catch (error) {
      console.error("Failed to load cart count:", error);
    }
  };

  useEffect(() => {
    loadCartCount();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        loadCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;