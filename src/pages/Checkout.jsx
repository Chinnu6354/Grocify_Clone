import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api, { placeOrder } from "../services/api";
import CartContext from "../context/CartContext";

function Checkout() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const { loadCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("CARD");

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await api.get("/cart");

      console.log("Checkout cart:", response.data);

      setCart(response.data);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const cartTotal =
    cart?.items?.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    ) || 0;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "pincode") {
      if (!/^\d*$/.test(value)) {
        return;
      }
    }

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    // Address validation
    if (
      !address.name.trim() ||
      !address.phone.trim() ||
      !address.address.trim() ||
      !address.city.trim() ||
      !address.pincode.trim()
    ) {
      alert("Please fill all required delivery details");
      return;
    }

    // Phone validation
    if (!/^\d{10}$/.test(address.phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    // PIN validation
    if (!/^\d{6}$/.test(address.pincode)) {
      alert("PIN code must be exactly 6 digits");
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      console.log("Payment Method:", paymentMethod);

      await placeOrder(
        user.email,
        address.name,
        address.phone,
        address.address,
        address.city,
        address.pincode,
        paymentMethod
      );

      await loadCartCount();

      alert("Order placed successfully!");

      navigate("/orders");
    } catch (error) {
      console.error("Checkout failed:", error);

      alert(
        error.response?.data?.message ||
          "Failed to place order"
      );
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 px-6 py-16 text-center">
        <p className="text-gray-600">
          Loading checkout...
        </p>
      </section>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <section className="min-h-screen bg-gray-50 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Your Cart is Empty
        </h2>

        <p className="mt-3 text-gray-500">
          Add products before checkout.
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-6 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Continue Shopping
        </button>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

      {/* Page Header */}
      <div className="mx-auto mb-6 max-w-7xl">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Checkout
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Complete your order securely
            </p>
          </div>

          {/* Breadcrumb */}
          <div className="hidden items-center gap-2 text-sm md:flex">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-gray-500 hover:text-orange-500"
            >
              Home
            </button>

            <span className="text-gray-400">
              ›
            </span>

            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="text-gray-500 hover:text-orange-500"
            >
              Cart
            </button>

            <span className="text-gray-400">
              ›
            </span>

            <span className="font-medium text-orange-500">
              Checkout
            </span>
          </div>

        </div>
      </div>

      {/* Main Checkout */}
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.7fr_0.9fr]">

        {/* LEFT SIDE */}
        <div className="rounded-xl bg-white p-6 shadow-sm">

          <form onSubmit={handlePlaceOrder}>

            {/* ================= SHIPPING ADDRESS ================= */}

            <div>

              <div className="mb-6 flex items-center gap-3">

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                  1
                </span>

                <h2 className="text-xl font-bold text-gray-900">
                  Shipping Address
                </h2>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={address.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    Phone Number{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    maxLength="10"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    Address Line 1{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    name="address"
                    value={address.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    rows="3"
                    required
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    City <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    placeholder="Bangalore"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    Pincode <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleChange}
                    placeholder="560001"
                    maxLength="6"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

              </div>

            </div>

            {/* Divider */}
            <div className="my-8 border-t border-gray-200" />

            {/* ================= PAYMENT METHOD ================= */}

            <div>

              <div className="mb-6 flex items-center gap-3">

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                  2
                </span>

                <h2 className="text-xl font-bold text-gray-900">
                  Payment Method
                </h2>

              </div>

              {/* Payment Options */}
              <div className="grid gap-4 md:grid-cols-3">

                {/* CARD */}
                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("CARD")
                  }
                  className={`rounded-lg border-2 p-4 text-left transition ${
                    paymentMethod === "CARD"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 bg-white hover:border-orange-300"
                  }`}
                >
                  <div className="flex items-center gap-3">

                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        paymentMethod === "CARD"
                          ? "border-orange-500"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "CARD" && (
                        <span className="h-3 w-3 rounded-full bg-orange-500" />
                      )}
                    </span>

                    <div>
                      <p className="font-semibold text-gray-900">
                        💳 Credit / Debit Card
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Visa, Mastercard, RuPay
                      </p>
                    </div>

                  </div>
                </button>

                {/* UPI */}
                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("UPI")
                  }
                  className={`rounded-lg border-2 p-4 text-left transition ${
                    paymentMethod === "UPI"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 bg-white hover:border-orange-300"
                  }`}
                >
                  <div className="flex items-center gap-3">

                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        paymentMethod === "UPI"
                          ? "border-orange-500"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "UPI" && (
                        <span className="h-3 w-3 rounded-full bg-orange-500" />
                      )}
                    </span>

                    <div>
                      <p className="font-semibold text-gray-900">
                        🟣 UPI
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Google Pay, PhonePe, Paytm
                      </p>
                    </div>

                  </div>
                </button>

                {/* WALLET */}
                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("WALLET")
                  }
                  className={`rounded-lg border-2 p-4 text-left transition ${
                    paymentMethod === "WALLET"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 bg-white hover:border-orange-300"
                  }`}
                >
                  <div className="flex items-center gap-3">

                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        paymentMethod === "WALLET"
                          ? "border-orange-500"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "WALLET" && (
                        <span className="h-3 w-3 rounded-full bg-orange-500" />
                      )}
                    </span>

                    <div>
                      <p className="font-semibold text-gray-900">
                        👛 Wallet
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Amazon Pay, Paytm
                      </p>
                    </div>

                  </div>
                </button>

              </div>

              {/* ================= CARD DETAILS ================= */}

              {paymentMethod === "CARD" && (
                <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50/40 p-5">

                  <div className="grid gap-5 md:grid-cols-2">

                    {/* Card Number */}
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-800">
                        Card Number{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>

                    {/* Name */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-800">
                        Name on Card{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>

                    {/* Expiry */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-800">
                        Expiry Date{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        placeholder="MM / YY"
                        maxLength="5"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>

                    {/* CVV */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-800">
                        CVV{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="password"
                        placeholder="123"
                        maxLength="3"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>

                  </div>

                </div>
              )}

              {/* UPI Details */}
              {paymentMethod === "UPI" && (
                <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50/40 p-5">

                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    UPI ID
                  </label>

                  <input
                    type="text"
                    placeholder="example@upi"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Enter your UPI ID to continue.
                  </p>

                </div>
              )}

              {/* Wallet Details */}
              {paymentMethod === "WALLET" && (
                <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50/40 p-5">

                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    Select Wallet
                  </label>

                  <select
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="">
                      Select Wallet
                    </option>
                    <option value="PAYTM">
                      Paytm
                    </option>
                    <option value="AMAZON_PAY">
                      Amazon Pay
                    </option>
                  </select>

                </div>
              )}

            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="font-semibold text-orange-500 transition hover:text-orange-600"
              >
                ← Back to Cart
              </button>

              <button
                type="submit"
                className="rounded-lg bg-orange-500 px-10 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                Place Order →
              </button>

            </div>

          </form>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="h-fit rounded-xl bg-white p-6 shadow-sm lg:sticky lg:top-6">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              Edit Cart
            </button>

          </div>

          {/* Products */}
          <div className="space-y-4">

            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">

                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />

                  </div>

                  <div className="min-w-0">

                    <p className="truncate font-semibold text-gray-900">
                      {item.product.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>

                    <p className="text-sm text-gray-500">
                      ₹{item.product.price} each
                    </p>

                  </div>

                </div>

                <p className="shrink-0 font-semibold text-gray-900">
                  ₹
                  {item.product.price *
                    item.quantity}
                </p>

              </div>
            ))}

          </div>

          {/* Price Details */}
          <div className="mt-6 space-y-4 border-b border-gray-200 pb-6">

            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Subtotal ({cart.items.length} items)
              </span>

              <span>
                ₹{cartTotal}
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Shipping
              </span>

              <span className="font-medium text-green-600">
                Free
              </span>
            </div>

          </div>

          {/* Total */}
          <div className="mt-6 flex items-center justify-between">

            <span className="text-xl font-bold text-gray-900">
              Total
            </span>

            <span className="text-2xl font-bold text-orange-500">
              ₹{cartTotal}
            </span>

          </div>

          {/* Benefits */}
          <div className="mt-7 grid grid-cols-3 gap-3 border-t border-gray-200 pt-6">

            <div className="text-center">

              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
                🚚
              </div>

              <p className="text-xs font-semibold text-gray-900">
                Free Shipping
              </p>

              <p className="mt-1 text-[10px] text-gray-500">
                On your order
              </p>

            </div>

            <div className="text-center">

              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
                🛡️
              </div>

              <p className="text-xs font-semibold text-gray-900">
                Secure Payment
              </p>

              <p className="mt-1 text-[10px] text-gray-500">
                100% protected
              </p>

            </div>

            <div className="text-center">

              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
                ↩️
              </div>

              <p className="text-xs font-semibold text-gray-900">
                Easy Returns
              </p>

              <p className="mt-1 text-[10px] text-gray-500">
                3 days return
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Checkout;