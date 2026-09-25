import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import api, {
  removeFromCart,
  updateCartQuantity,
} from "../services/api";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const { loadCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await api.get("/cart");

      console.log("Cart from backend:", response.data);

      setCart(response.data);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);

      await loadCartCount();
      await loadCart();

      alert("Product removed from cart");
    } catch (error) {
      console.error("Failed to remove product:", error);

      alert("Failed to remove product");
    }
  };

  const handleQuantityChange = async (
    productId,
    currentQuantity,
    change
  ) => {
    const newQuantity = currentQuantity + change;

    // Don't allow quantity below 1
    if (newQuantity < 1) {
      return;
    }

    try {
      await updateCartQuantity(productId, newQuantity);

      await loadCartCount();
      await loadCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);

      alert("Failed to update quantity");
    }
  };

  const cartTotal =
    cart?.items?.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    ) || 0;

  /*
   * Shipping
   * You can change this amount later if required.
   */
  const shipping = cartTotal > 50 ? 0 : 10;

  const grandTotal = cartTotal + shipping;

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="min-h-[70vh] bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-gray-500">
            Loading cart...
          </p>
        </div>
      </section>
    );
  }

  // =========================
  // EMPTY CART
  // =========================

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6 py-16">
        <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-sm">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
            <span className="text-4xl">🛒</span>
          </div>

          <h2 className="text-3xl font-bold text-slate-900">
            Your Cart is Empty
          </h2>

          <p className="mt-3 text-gray-500">
            Add some products to your cart.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-7 rounded-xl bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Continue Shopping
          </button>

        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Shopping Cart
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Review your items and proceed to checkout
            </p>
          </div>

          <div className="text-sm text-gray-500">
            <button
              onClick={() => navigate("/")}
              className="transition hover:text-orange-500"
            >
              Home
            </button>

            <span className="mx-2">
              ›
            </span>

            <span className="font-medium text-orange-500">
              Cart
            </span>
          </div>

        </div>

        {/* =========================
            MAIN CART AREA
        ========================= */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">

          {/* =========================
              CART PRODUCTS
          ========================= */}

          <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">

            <div className="divide-y divide-gray-100">

              {cart.items.map((item) => (

                <div
                  key={item.id}
                  className="flex flex-col gap-4 py-5 first:pt-1 sm:flex-row sm:items-center sm:justify-between"
                >

                  {/* Product */}
                  <div className="flex min-w-0 items-center gap-4">

                    {/* Image */}
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">

                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />

                    </div>

                    {/* Product information */}
                    <div className="min-w-0">

                      <h3 className="truncate text-base font-bold text-slate-900 sm:text-lg">
                        {item.product.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Grocery Product
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        ₹{item.product.price} each
                      </p>

                    </div>

                  </div>

                  {/* Quantity + Price + Remove */}
                  <div className="flex items-center justify-between gap-4 sm:justify-end">

                    {/* Quantity */}
                    <div className="flex items-center overflow-hidden rounded-full border border-gray-200 bg-white">

                      <button
                        type="button"
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          handleQuantityChange(
                            item.product.id,
                            item.quantity,
                            -1
                          )
                        }
                        className={`flex h-9 w-9 items-center justify-center text-lg transition ${
                          item.quantity <= 1
                            ? "cursor-not-allowed text-gray-300"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        −
                      </button>

                      <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-200 px-3 text-sm font-semibold text-gray-800">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(
                            item.product.id,
                            item.quantity,
                            1
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center text-lg text-gray-600 transition hover:bg-gray-50"
                      >
                        +
                      </button>

                    </div>

                    {/* Item price */}
                    <div className="min-w-[85px] text-right">

                      <p className="font-bold text-orange-500">
                        ₹
                        {(
                          item.product.price *
                          item.quantity
                        ).toFixed(2)}
                      </p>

                      {item.quantity > 1 && (
                        <p className="text-xs text-gray-400">
                          ₹{item.product.price} each
                        </p>
                      )}

                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemove(item.product.id)
                      }
                      className="text-xl text-gray-400 transition hover:text-red-500"
                      title="Remove product"
                    >
                      ×
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* Continue shopping */}
            <div className="mt-4 border-t border-gray-100 pt-5">

              <button
                onClick={() => navigate("/")}
                className="rounded-lg border border-orange-500 px-5 py-2.5 text-sm font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-white"
              >
                ← Continue Shopping
              </button>

            </div>

          </div>

          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <div className="h-fit rounded-2xl bg-white p-5 shadow-sm sm:p-6">

            <h2 className="text-xl font-bold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              {/* Subtotal */}
              <div className="flex justify-between text-sm">

                <span className="text-gray-600">
                  Subtotal ({cart.items.length}{" "}
                  {cart.items.length === 1
                    ? "item"
                    : "items"})
                </span>

                <span className="font-medium text-gray-800">
                  ₹{cartTotal.toFixed(2)}
                </span>

              </div>

              {/* Shipping */}
              <div className="flex justify-between text-sm">

                <span className="text-gray-600">
                  Shipping
                </span>

                <span className="font-medium text-gray-800">
                  {shipping === 0
                    ? "FREE"
                    : `₹${shipping.toFixed(2)}`}
                </span>

              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 pt-4">

                <div className="flex items-center justify-between">

                  <span className="text-lg font-bold text-slate-900">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-orange-500">
                    ₹{grandTotal.toFixed(2)}
                  </span>

                </div>

              </div>

            </div>

            {/* Checkout */}
            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 font-semibold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.99]"
            >
              Proceed to Checkout
              <span>→</span>
            </button>

            {/* Secure checkout */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <span>🔒</span>
              <span>Secure checkout</span>
            </div>

          </div>

        </div>

        {/* =========================
            BOTTOM FEATURES
        ========================= */}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Free Shipping */}
          <div className="flex items-center gap-4 rounded-2xl bg-transparent px-4 py-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl">
              🚚
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Free Shipping
              </h3>

              <p className="text-sm text-gray-500">
                On orders over ₹50
              </p>
            </div>

          </div>

          {/* Secure Payment */}
          <div className="flex items-center gap-4 rounded-2xl bg-transparent px-4 py-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl">
              🛡️
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Secure Payment
              </h3>

              <p className="text-sm text-gray-500">
                100% secure checkout
              </p>
            </div>

          </div>

          {/* Support */}
          <div className="flex items-center gap-4 rounded-2xl bg-transparent px-4 py-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl">
              🎧
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                24/7 Support
              </h3>

              <p className="text-sm text-gray-500">
                We're here to help
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Cart;