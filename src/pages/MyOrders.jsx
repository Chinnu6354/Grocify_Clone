import { useEffect, useState } from "react";
import api from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);

      const response = await api.get(
        `/orders?email=${encodeURIComponent(user.email)}`
      );

      setOrders(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        alert("Please login first");
        return;
      }

      const user = JSON.parse(storedUser);

      await api.put(
        `/orders/${orderId}/cancel?email=${encodeURIComponent(
          user.email
        )}`
      );

      alert("Order cancelled successfully");

      await loadOrders();
    } catch (error) {
      console.error("Failed to cancel order:", error);

      alert(
        error.response?.data?.message ||
          "Failed to cancel order"
      );
    }
  };

  const handleViewDetails = (orderId) => {
    setExpandedOrder(
      expandedOrder === orderId ? null : orderId
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "PLACED":
        return "bg-green-100 text-green-700";

      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";

        case "SHIPPED":
  return "bg-indigo-100 text-indigo-700";

      case "OUT_FOR_DELIVERY":
        return "bg-yellow-100 text-yellow-700";

      case "DELIVERED":
        return "bg-purple-100 text-purple-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "PLACED":
        return "Placed";

      case "CONFIRMED":
        return "Confirmed";

        case "SHIPPED":
  return "Shipped";

      case "OUT_FOR_DELIVERY":
        return "Out for Delivery";

      case "DELIVERED":
        return "Delivered";

      case "CANCELLED":
        return "Cancelled";

      default:
        return status || "Unknown";
    }
  };

  const getPaymentMethodText = (paymentMethod) => {
  switch (paymentMethod) {
    case "CARD":
    case "CREDIT_CARD":
    case "DEBIT_CARD":
    case "Credit / Debit Card":
      return "Credit / Debit Card";

    case "UPI":
      return "UPI";

    case "WALLET":
      return "Wallet";

    default:
      return paymentMethod || "Not Available";
  }
};

 const getPaymentIcon = (paymentMethod) => {
  switch (paymentMethod) {
    case "CARD":
    case "CREDIT_CARD":
    case "DEBIT_CARD":
    case "Credit / Debit Card":
      return "💳";

    case "UPI":
      return "📱";

    case "WALLET":
      return "👛";

    default:
      return "💰";
  }
};

  /*
   * ================================
   * TRACK ORDER
   * ================================
   */

  const trackingSteps = [
    {
      status: "PLACED",
      title: "Order Placed",
      description: "Your order has been placed successfully.",
    },
    {
      status: "CONFIRMED",
      title: "Order Confirmed",
      description: "Your order has been confirmed.",
    },
     {
    status: "SHIPPED",
    title: "Shipped",
    description: "Your order has been shipped.",
  },
    {
      status: "OUT_FOR_DELIVERY",
      title: "Out for Delivery",
      description: "Your order is on the way.",
    },
    {
      status: "DELIVERED",
      title: "Delivered",
      description: "Your order has been delivered.",
    },
  ];

  const getTrackingStep = (status) => {
    return trackingSteps.findIndex(
      (step) => step.status === status
    );
  };

  const TrackOrder = ({ status }) => {
    if (status === "CANCELLED") {
      return (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-xl">
              ✕
            </div>

            <div>
              <h4 className="font-bold text-red-700">
                Order Cancelled
              </h4>

              <p className="text-sm text-red-600">
                This order has been cancelled.
              </p>
            </div>

          </div>

        </div>
      );
    }

    const currentStep = getTrackingStep(status);

    return (
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

        <h4 className="mb-6 text-xl font-bold text-gray-900">
          Track Order
        </h4>

        <div className="space-y-0">

          {trackingSteps.map((step, index) => {

            const completed = index <= currentStep;
            const isCurrent = index === currentStep;
            const isLast =
              index === trackingSteps.length - 1;

            return (
              <div
                key={step.status}
                className="flex"
              >

                {/* Timeline */}
                <div className="mr-4 flex flex-col items-center">

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold ${
                      completed
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {completed ? "✓" : index + 1}
                  </div>

                  {!isLast && (
                    <div
                      className={`h-12 w-0.5 ${
                        index < currentStep
                          ? "bg-orange-500"
                          : "bg-gray-300"
                      }`}
                    />
                  )}

                </div>

                {/* Step Content */}
                <div className="pb-6">

                  <h5
                    className={`font-bold ${
                      isCurrent
                        ? "text-orange-500"
                        : completed
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </h5>

                  <p
                    className={`mt-1 text-sm ${
                      completed
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    {step.description}
                  </p>

                  {isCurrent && (
                    <span className="mt-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                      Current Status
                    </span>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>
    );
  };

  if (loading) {
    return (
      <section className="px-6 py-16 text-center">
        <p className="text-gray-500">
          Loading orders...
        </p>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="px-6 py-16 text-center">

        <h2 className="text-3xl font-bold">
          No Orders Yet
        </h2>

        <p className="mt-3 text-gray-500">
          Your placed orders will appear here.
        </p>

      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-16">

      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mb-8">

          <h2 className="text-3xl font-bold text-gray-900">
            My Orders
          </h2>

          <p className="mt-2 text-gray-500">
            Track and manage your orders
          </p>

        </div>

        {/* Orders */}
        <div className="space-y-6">

          {orders.map((order) => {

            const totalItems =
              order.items?.reduce(
                (total, item) =>
                  total + (item.quantity || 0),
                0
              ) || 0;

            return (
              <div
                key={order.id}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg"
              >

                {/* Order Header */}
                <div className="p-6">

                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-xl font-bold text-gray-900">
                          Order #{order.id}
                        </h3>

                        <span
                          className={`rounded-full px-4 py-1.5 text-sm font-semibold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {getStatusText(order.status)}
                        </span>

                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        {order.createdAt
                          ? new Date(
                              order.createdAt
                            ).toLocaleString()
                          : "Date not available"}
                      </p>

                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">

                      {order.status === "PLACED" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleCancelOrder(order.id)
                          }
                          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                        >
                          Cancel Order
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          handleViewDetails(order.id)
                        }
                        className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                      >
                        {expandedOrder === order.id
                          ? "Hide Details"
                          : "View Details"}
                      </button>

                    </div>

                  </div>

                  {/* Summary */}
                  <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-5 md:grid-cols-3">

                    <div>
                      <p className="text-sm text-gray-500">
                        Items
                      </p>

                      <p className="mt-1 font-semibold">
                        {totalItems}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Payment
                      </p>

                      <p className="mt-1 font-semibold">
                        {getPaymentMethodText(
                          order.paymentMethod
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Total
                      </p>

                      <p className="mt-1 text-lg font-bold text-orange-500">
                        ₹{order.totalAmount}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Expanded Details */}
                {expandedOrder === order.id && (
                  <div className="border-t bg-gray-50 p-6">

                    {/* Track Order */}
                    <TrackOrder
                      status={order.status}
                    />

                    {/* Products */}
                    <div className="mt-6">

                      <h4 className="mb-4 text-xl font-bold">
                        Products
                      </h4>

                      <div className="space-y-3">

                        {(order.items || []).map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
                          >

                            <div className="flex items-center gap-4">

                              {item.product?.image && (
                                <img
                                  src={item.product.image}
                                  alt={
                                    item.product?.name ||
                                    "Product"
                                  }
                                  className="h-16 w-16 rounded-lg object-cover"
                                />
                              )}

                              <div>

                                <p className="font-semibold">
                                  {item.product?.name ||
                                    "Product"}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                  ₹{item.price} ×{" "}
                                  {item.quantity}
                                </p>

                              </div>

                            </div>

                            <p className="font-bold">
                              ₹
                              {(
                                (item.price || 0) *
                                (item.quantity || 0)
                              ).toFixed(2)}
                            </p>

                          </div>
                        ))}

                      </div>

                    </div>

                    {/* Delivery + Payment */}
                    <div className="mt-6 grid gap-6 md:grid-cols-2">

                      {/* Delivery */}
                      <div className="rounded-xl bg-white p-5 shadow-sm">

                        <h4 className="mb-4 text-lg font-bold">
                          Delivery Details
                        </h4>

                        <div className="space-y-3 text-gray-700">

                          <p>
                            <span className="font-semibold">
                              Name:
                            </span>{" "}
                            {order.deliveryName}
                          </p>

                          <p>
                            <span className="font-semibold">
                              Phone:
                            </span>{" "}
                            {order.deliveryPhone}
                          </p>

                          <p>
                            <span className="font-semibold">
                              Address:
                            </span>{" "}
                            {order.deliveryAddress}
                          </p>

                          <p>
                            <span className="font-semibold">
                              City:
                            </span>{" "}
                            {order.deliveryCity}
                          </p>

                          <p>
                            <span className="font-semibold">
                              PIN Code:
                            </span>{" "}
                            {order.deliveryPincode}
                          </p>

                        </div>

                      </div>

                      {/* Payment */}
                      <div className="rounded-xl bg-orange-50 p-5 shadow-sm">

                        <div className="mb-4 flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-xl">
                            {getPaymentIcon(
                              order.paymentMethod
                            )}
                          </div>

                          <h4 className="text-lg font-bold">
                            Payment Method
                          </h4>

                        </div>

                        <p className="text-gray-700">

                          <span className="font-semibold">
                            Method:
                          </span>{" "}

                          {getPaymentMethodText(
                            order.paymentMethod
                          )}

                        </p>

                      </div>

                    </div>

                    {/* Total */}
                    <div className="mt-6 flex items-center justify-between rounded-xl bg-white p-5 shadow-sm">

                      <span className="text-lg font-bold">
                        Order Total
                      </span>

                      <span className="text-2xl font-bold text-orange-500">
                        ₹{order.totalAmount}
                      </span>

                    </div>

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default MyOrders;