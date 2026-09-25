import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getAllOrders,
  updateOrderStatus,
  uploadProductImage,
  getContactMessages,
  deleteContactMessage,
} from "../services/api";

function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Product search and category filter
  const [productSearch, setProductSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Customer messages
  const [contactMessages, setContactMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {
    loadProducts();
    loadOrders();
    loadContactMessages();
  }, []);

  // =========================
  // LOAD PRODUCTS
  // =========================

  const loadProducts = async () => {
    try {
      const response = await getProducts();

      console.log("Products:", response.data);

      setProducts(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load products:",
        error
      );
    }
  };

  // =========================
  // LOAD ORDERS
  // =========================

  const loadOrders = async () => {
    try {
      const response = await getAllOrders();

      console.log("Orders:", response.data);

      setOrders(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load orders:",
        error
      );
    }
  };

  // =========================
  // LOAD CONTACT MESSAGES
  // =========================

  const loadContactMessages = async () => {
    try {
      const response = await getContactMessages();

      console.log(
        "Contact messages:",
        response.data
      );

      setContactMessages(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load contact messages:",
        error
      );
    }
  };

  // =========================
  // PRODUCT FORM
  // =========================

  const openAddProduct = () => {
    setEditingId(null);

    setFormData({
      name: "",
      category: "",
      price: "",
      image: "",
      description: "",
    });

    setShowProductForm(true);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      image: product.image || "",
      description: product.description || "",
    });

    setShowProductForm(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
      name: "",
      category: "",
      price: "",
      image: "",
      description: "",
    });

    setShowProductForm(false);
  };

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // CREATE / UPDATE PRODUCT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const product = {
        ...formData,
        price: Number(formData.price),
      };

      if (editingId) {
        const response = await updateProduct(
          editingId,
          product
        );

        console.log(
          "Product updated:",
          response.data
        );

        setMessage(
          "Product updated successfully!"
        );

        setEditingId(null);
      } else {
        const response = await createProduct(
          product
        );

        console.log(
          "Product created:",
          response.data
        );

        setMessage(
          "Product created successfully!"
        );
      }

      setFormData({
        name: "",
        category: "",
        price: "",
        image: "",
        description: "",
      });

      setShowProductForm(false);

      await loadProducts();

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error(
        "Product operation failed:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Operation failed"
      );
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(id);

      setMessage(
        "Product deleted successfully!"
      );

      await loadProducts();

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error(
        "Failed to delete product:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  // =========================
  // ORDER STATUS
  // =========================

  const handleOrderStatusChange = async (
    orderId,
    status
  ) => {
    const confirmed = window.confirm(
      `Change Order #${orderId} status to ${getStatusText(
        status
      )}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await updateOrderStatus(
        orderId,
        status
      );

      // Update order table immediately
      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: status,
              }
            : order
        )
      );

      // Update opened modal immediately
      setSelectedOrder((previousOrder) =>
        previousOrder &&
        previousOrder.id === orderId
          ? {
              ...previousOrder,
              status: status,
            }
          : previousOrder
      );

      setMessage(
        `Order #${orderId} status updated to ${getStatusText(
          status
        )}`
      );

      await loadOrders();

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error(
        "Failed to update order status:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to update order status"
      );
    }
  };

  // =========================
  // STATUS STYLE
  // =========================

  const getStatusStyle = (status) => {
    switch (status) {
      case "PLACED":
        return "bg-yellow-100 text-yellow-700";

      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";

      case "OUT_FOR_DELIVERY":
        return "bg-purple-100 text-purple-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // =========================
  // STATUS TEXT
  // =========================

  const getStatusText = (status) => {
    switch (status) {
      case "OUT_FOR_DELIVERY":
        return "OUT FOR DELIVERY";

      case "PLACED":
        return "PLACED";

      case "CONFIRMED":
        return "CONFIRMED";

      case "DELIVERED":
        return "DELIVERED";

      case "CANCELLED":
        return "CANCELLED";

      default:
        return status || "UNKNOWN";
    }
  };

  // =========================
  // CATEGORY LIST
  // =========================

  const categories = [
    ...new Set(
      products
        .map((product) =>
          product.category?.trim()
        )
        .filter(Boolean)
    ),
  ].sort((a, b) =>
    a.localeCompare(b)
  );

  // =========================
  // FILTER PRODUCTS
  // =========================

  const searchValue =
    productSearch.trim().toLowerCase();

  const filteredProducts = products.filter(
    (product) => {
      const productName =
        product.name?.toLowerCase() || "";

      const productCategory =
        product.category?.toLowerCase() || "";

      const productDescription =
        product.description?.toLowerCase() || "";

      const matchesSearch =
        productName.includes(searchValue) ||
        productCategory.includes(searchValue) ||
        productDescription.includes(searchValue);

      const matchesCategory =
        selectedCategory === "ALL" ||
        product.category === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  // =========================
  // DASHBOARD STATS
  // =========================

  const totalProducts = products.length;

  const totalOrders = orders.length;

  const totalRevenue = orders
    .filter(
      (order) =>
        order.status !== "CANCELLED"
    )
    .reduce(
      (total, order) =>
        total +
        Number(order.totalAmount || 0),
      0
    );

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "PLACED" ||
      order.status === "CONFIRMED" ||
      order.status === "OUT_FOR_DELIVERY"
  ).length;

  // =========================
  // IMAGE UPLOAD
  // =========================

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    try {
      setMessage("Uploading image...");

      const response =
        await uploadProductImage(file);

      setFormData((prev) => ({
        ...prev,
        image: response.data,
      }));

      setMessage(
        "Image uploaded successfully!"
      );
    } catch (error) {
      console.error(
        "Image upload failed:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Image upload failed"
      );
    }
  };

  // =========================
  // DELETE CONTACT MESSAGE
  // =========================

  const handleDeleteContactMessage = async (
    id
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteContactMessage(id);

      setContactMessages((previousMessages) =>
        previousMessages.filter(
          (item) => item.id !== id
        )
      );

      if (
        selectedMessage &&
        selectedMessage.id === id
      ) {
        setSelectedMessage(null);
      }

      setMessage(
        "Customer message deleted successfully!"
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error(
        "Failed to delete contact message:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to delete message"
      );
    }
  };

  // =========================
  // VIEW CUSTOMER MESSAGE
  // =========================

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
  };

  // =========================
  // SCROLL TO MESSAGES
  // =========================

  const handleCustomerMessagesClick = (
    e
  ) => {
    e.preventDefault();

    const messagesSection =
      document.getElementById("messages");

    if (messagesSection) {
      messagesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // =========================
  // RETURN
  // =========================

  return (
    <div className="min-h-screen bg-[#f6f8fb]">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-gray-100 bg-white lg:block">

        <div className="flex h-full flex-col">

          {/* LOGO */}

          <div className="flex items-center gap-3 px-6 py-7">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-2xl text-white shadow-md">
              🛒
            </div>

            <div>

              <h2 className="text-xl font-bold text-[#172b4d]">
                Grocery
                <span className="text-orange-500">
                  {" "}
                  Admin
                </span>
              </h2>

              <p className="text-xs text-gray-400">
                Management Panel
              </p>

            </div>

          </div>

          {/* NAVIGATION */}

          <nav className="flex-1 px-4">

            <a
              href="#dashboard"
              className="mb-2 flex items-center gap-3 rounded-xl bg-orange-50 px-4 py-3 font-semibold text-orange-600"
            >
              📊
              Dashboard
            </a>

            <a
              href="#products"
              className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-orange-50 hover:text-orange-600"
            >
              📦
              Products
            </a>

            <a
              href="#orders"
              className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-orange-50 hover:text-orange-600"
            >
              🧾
              Orders
            </a>

            <a
              href="#messages"
              onClick={
                handleCustomerMessagesClick
              }
              className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-orange-50 hover:text-orange-600"
            >
              💬
              Customer Messages
            </a>

          </nav>

        </div>

      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="lg:ml-64">

        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

          {/* HEADER */}

          <div
            id="dashboard"
            className="mb-8"
          >

            <h1 className="text-3xl font-bold text-[#172b4d]">
              Admin Dashboard
            </h1>

            <p className="mt-1 text-gray-500">
              Manage your grocery store
            </p>

          </div>

          {/* MESSAGE */}

          {message && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 font-medium text-green-700">
              {message}
            </div>
          )}

          {/* =========================
              DASHBOARD CARDS
          ========================= */}

          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {/* Total Products */}

            <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Total Products
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#172b4d]">
                  {totalProducts}
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  In store
                </p>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-2xl">
                📦
              </div>

            </div>

            {/* Total Orders */}

            <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Total Orders
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#172b4d]">
                  {totalOrders}
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  All time
                </p>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
                📋
              </div>

            </div>

            {/* Total Revenue */}

            <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Total Revenue
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#172b4d]">
                  ₹{totalRevenue}
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  All time
                </p>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-2xl">
                ₹
              </div>

            </div>

            {/* Pending Orders */}

            <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Pending Orders
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#172b4d]">
                  {pendingOrders}
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Need attention
                </p>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
                👥
              </div>

            </div>

          </div>

          {/* =========================
              PRODUCTS
          ========================= */}

          <section
            id="products"
            className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
          >

            {/* HEADER */}

            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-xl">
                  📦
                </div>

                <div>

                  <h2 className="text-xl font-bold text-[#172b4d]">
                    Products
                  </h2>

                  <p className="text-sm text-[#526581]">
                    Manage your products
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={openAddProduct}
                className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                + Add Product
              </button>

            </div>

            {/* SEARCH + CATEGORY */}

            <div className="mb-5 flex flex-col gap-3 md:flex-row">

              {/* SEARCH */}

              <div className="relative flex-1">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search by product name, category or description..."
                  value={productSearch}
                  onChange={(e) =>
                    setProductSearch(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />

              </div>

              {/* CATEGORY */}

              <div className="md:w-64">

                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                >

                  <option value="ALL">
                    All Categories
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}

                </select>

              </div>

            </div>

            {/* FILTER RESULT COUNT */}

            <div className="mb-4 flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">

              <p>

                Showing{" "}

                <span className="font-semibold text-gray-700">
                  {filteredProducts.length}
                </span>

                {" "}of{" "}

                <span className="font-semibold text-gray-700">
                  {products.length}
                </span>

                {" "}products

              </p>

              {(productSearch ||
                selectedCategory !== "ALL") && (

                <button
                  type="button"
                  onClick={() => {
                    setProductSearch("");
                    setSelectedCategory("ALL");
                  }}
                  className="font-semibold text-orange-500 hover:text-orange-600"
                >
                  Clear Filters
                </button>

              )}

            </div>

            {/* PRODUCT TABLE */}

            {filteredProducts.length === 0 ? (

              <div className="rounded-xl border border-dashed border-gray-300 py-12 text-center">

                <div className="text-4xl">
                  📦
                </div>

                <p className="mt-3 font-semibold text-gray-700">
                  No products found
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or category filter.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[750px]">

                  <thead>

                    <tr className="border-b border-gray-100 text-left text-sm text-gray-500">

                      <th className="px-4 py-4">
                        Product
                      </th>

                      <th className="px-4 py-4">
                        Category
                      </th>

                      <th className="px-4 py-4">
                        Price
                      </th>

                      <th className="px-4 py-4">
                        Description
                      </th>

                      <th className="px-4 py-4 text-center">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredProducts.map(
                      (product) => (

                        <tr
                          key={product.id}
                          className="border-b border-gray-50 transition hover:bg-gray-50"
                        >

                          <td className="px-4 py-4">

                            <div className="flex items-center gap-3">

                              <img
                                src={product.image}
                                alt={
                                  product.name
                                }
                                className="h-14 w-14 rounded-xl object-cover"
                              />

                              <div>

                                <p className="font-semibold text-[#172b4d]">
                                  {product.name}
                                </p>

                                <p className="text-xs text-gray-400">
                                  ID:{" "}
                                  {product.id}
                                </p>

                              </div>

                            </div>

                          </td>

                          <td className="px-4 py-4">

                            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                              {product.category ||
                                "-"}
                            </span>

                          </td>

                          <td className="px-4 py-4 font-semibold">
                            ₹{product.price}
                          </td>

                          <td className="max-w-xs px-4 py-4 text-sm text-gray-500">
                            {product.description ||
                              "-"}
                          </td>

                          <td className="px-4 py-4">

                            <div className="flex justify-center gap-2">

                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(
                                    product
                                  )
                                }
                                className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    product.id
                                  )
                                }
                                className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </section>

          {/* =========================
              ORDERS
          ========================= */}

          <section
            id="orders"
            className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
          >

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-xl">
                🧾
              </div>

              <div>

                <h2 className="text-xl font-bold text-[#172b4d]">
                  Orders
                </h2>

                <p className="text-sm text-[#526581]">
                  Manage customer orders
                </p>

              </div>

            </div>

            {orders.length === 0 ? (

              <div className="rounded-xl border border-dashed border-gray-300 py-12 text-center">

                <p className="font-semibold text-gray-700">
                  No orders found
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[850px]">

                  <thead>

                    <tr className="border-b border-gray-100 text-left text-sm text-gray-500">

                      <th className="px-4 py-4">
                        Order
                      </th>

                      <th className="px-4 py-4">
                        Customer
                      </th>

                      <th className="px-4 py-4">
                        Total
                      </th>

                      <th className="px-4 py-4">
                        Status
                      </th>

                      <th className="px-4 py-4">
                        Date
                      </th>

                      <th className="px-4 py-4 text-center">
                        Details
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {orders.map(
                      (order) => (

                        <tr
                          key={order.id}
                          className="border-b border-gray-50"
                        >

                          <td className="px-4 py-4 font-semibold">
                            #{order.id}
                          </td>

                          <td className="px-4 py-4">

                            <p className="font-semibold">
                              {order.user?.name ||
                                "Unknown"}
                            </p>

                            <p className="text-sm text-gray-500">
                              {order.user?.email ||
                                "-"}
                            </p>

                          </td>

                          <td className="px-4 py-4 font-semibold">
                            ₹
                            {order.totalAmount}
                          </td>

                          <td className="px-4 py-4">

                            <select
                              value={
                                order.status ||
                                "PLACED"
                              }
                              onChange={(e) =>
                                handleOrderStatusChange(
                                  order.id,
                                  e.target.value
                                )
                              }
                              className={`rounded-full border-0 px-3 py-2 text-xs font-semibold outline-none ${getStatusStyle(
                                order.status
                              )}`}
                            >

                              <option value="PLACED">
                                PLACED
                              </option>

                              <option value="CONFIRMED">
                                CONFIRMED
                              </option>

                              <option value="OUT_FOR_DELIVERY">
                                OUT FOR DELIVERY
                              </option>

                              <option value="DELIVERED">
                                DELIVERED
                              </option>

                              {order.status ===
                                "CANCELLED" && (

                                <option value="CANCELLED">
                                  CANCELLED
                                </option>

                              )}

                            </select>

                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500">

                            {order.createdAt
                              ? new Date(
                                  order.createdAt
                                ).toLocaleDateString(
                                  "en-IN"
                                )
                              : "-"}

                          </td>

                          <td className="px-4 py-4 text-center">

                            <button
                              type="button"
                              onClick={() =>
                                setSelectedOrder(
                                  order
                                )
                              }
                              className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                            >
                              View
                            </button>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </section>

         {/* =========================
    CUSTOMER MESSAGES
========================= */}

<section
  id="messages"
  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
>
  {/* HEADER */}
  <div className="mb-5 flex items-center gap-3">

    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-xl">
      💬
    </div>

    <div>
      <h2 className="text-xl font-bold text-[#172b4d]">
        Customer Messages
      </h2>

      <p className="text-sm text-[#526581]">
        Messages received from customers
      </p>
    </div>

  </div>

  {/* NO MESSAGES */}
  {contactMessages.length === 0 ? (

    <div className="rounded-xl border border-dashed border-gray-300 py-12 text-center">

      <p className="font-semibold text-gray-700">
        No customer messages
      </p>

      <p className="mt-1 text-sm text-gray-500">
        Customer messages will appear here.
      </p>

    </div>

  ) : (

    /* MESSAGES TABLE */
    <div className="overflow-x-auto">

      <table className="w-full min-w-[750px]">

        <thead>

          <tr className="border-b border-gray-100 text-left text-sm text-gray-500">

            <th className="px-4 py-4">
              Customer
            </th>

            <th className="px-4 py-4">
              Email
            </th>

            <th className="px-4 py-4">
              Message
            </th>

            <th className="px-4 py-4">
              Date
            </th>

            <th className="px-4 py-4 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {contactMessages.map((message) => (

            <tr
              key={message.id}
              className="border-b border-gray-50 transition hover:bg-gray-50"
            >

              {/* CUSTOMER */}
              <td className="px-4 py-4">

                <p className="font-semibold text-[#172b4d]">
                  {message.name || "-"}
                </p>

              </td>

              {/* EMAIL */}
              <td className="px-4 py-4">

                <a
                  href={`mailto:${message.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {message.email || "-"}
                </a>

              </td>

              {/* MESSAGE */}
              <td className="max-w-[280px] px-4 py-4">

                <p
                  className="truncate text-gray-700"
                  title={message.message}
                >
                  {message.message || "-"}
                </p>

              </td>

              {/* DATE */}
              <td className="px-4 py-4 text-sm text-gray-500">

                {message.createdAt
                  ? new Date(
                      message.createdAt
                    ).toLocaleDateString("en-IN")
                  : "-"}

              </td>

              {/* ACTION */}
              <td className="px-4 py-4 text-center">

                <button
                  type="button"
                  onClick={() => setSelectedMessage(message)}
                  className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  View
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )}

</section>

        </div>

      </main>

      {/* =========================
          ADD / EDIT PRODUCT MODAL
      ========================= */}

      {showProductForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-[#172b4d]">

                  {editingId
                    ? "Update Product"
                    : "Add Product"}

                </h2>

                <p className="text-sm text-gray-500">

                  {editingId
                    ? "Update product information"
                    : "Add a new product"}

                </p>

              </div>

              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* PRODUCT NAME */}

              <div>

                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="Product name"
                />

              </div>

              {/* CATEGORY */}

              <div>

                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="Category"
                />

              </div>

              {/* PRICE */}

              <div>

                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="Price"
                />

              </div>

              {/* PRODUCT IMAGE */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3"
                />

                {formData.image && (

                  <div className="mt-4">

                    <p className="mb-2 text-sm text-gray-500">
                      Image Preview
                    </p>

                    <img
                      src={formData.image}
                      alt="Product preview"
                      className="h-32 w-32 rounded-xl object-contain"
                    />

                  </div>

                )}

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="Product description"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex gap-3 pt-2">

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                  {editingId
                    ? "Update Product"
                    : "Add Product"}
                </button>

                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-200"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =========================
          CUSTOMER MESSAGE DETAILS MODAL
      ========================= */}

      {selectedMessage && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() =>
            setSelectedMessage(null)
          }
        >

          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-[#172b4d]">
                  Customer Message
                </h2>

                <p className="text-sm text-gray-500">
                  Message Details
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedMessage(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                ✕
              </button>

            </div>

            {/* CUSTOMER */}

            <div className="mb-4 rounded-xl bg-gray-50 p-4">

              <p className="text-sm font-semibold text-gray-500">
                Customer
              </p>

              <p className="mt-1 font-semibold text-[#172b4d]">
                {selectedMessage.name}
              </p>

            </div>

            {/* EMAIL */}

            <div className="mb-4 rounded-xl bg-gray-50 p-4">

              <p className="text-sm font-semibold text-gray-500">
                Email
              </p>

              <p className="mt-1 break-all text-[#172b4d]">
                {selectedMessage.email}
              </p>

            </div>

            {/* DATE */}

            <div className="mb-4 rounded-xl bg-gray-50 p-4">

              <p className="text-sm font-semibold text-gray-500">
                Date
              </p>

              <p className="mt-1 text-gray-700">
                {selectedMessage.createdAt
                  ? new Date(
                      selectedMessage.createdAt
                    ).toLocaleString(
                      "en-IN"
                    )
                  : "-"}
              </p>

            </div>

            {/* MESSAGE */}

            <div className="rounded-xl bg-orange-50 p-4">

              <p className="text-sm font-semibold text-orange-600">
                Message
              </p>

              <p className="mt-2 whitespace-pre-wrap leading-7 text-gray-700">
                {selectedMessage.message}
              </p>

            </div>

            {/* DELETE + CLOSE */}

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() =>
                  handleDeleteContactMessage(
                    selectedMessage.id
                  )
                }
                className="rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
              >
                Delete
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedMessage(null)
                }
                className="flex-1 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =========================
          ORDER DETAILS MODAL
      ========================= */}

      {selectedOrder && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() =>
            setSelectedOrder(null)
          }
        >

          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-[#172b4d]">
                  Order #{selectedOrder.id}
                </h2>

                <p className="text-sm text-gray-500">
                  Order Details
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                ✕
              </button>

            </div>

            {/* CUSTOMER */}

            <div className="mb-5 rounded-xl bg-gray-50 p-4">

              <h3 className="mb-2 font-bold text-[#172b4d]">
                Customer Details
              </h3>

              <p>
                Name:{" "}
                {selectedOrder.user?.name ||
                  "-"}
              </p>

              <p>
                Email:{" "}
                {selectedOrder.user?.email ||
                  "-"}
              </p>

            </div>

            {/* DELIVERY */}

            <div className="mb-5 rounded-xl bg-orange-50 p-4">

              <h3 className="mb-2 font-bold text-[#172b4d]">
                Delivery Details
              </h3>

              <div className="space-y-1">

                <p>
                  Name:{" "}
                  {selectedOrder.deliveryName ||
                    "-"}
                </p>

                <p>
                  Phone:{" "}
                  {selectedOrder.deliveryPhone ||
                    "-"}
                </p>

                <p>
                  Address:{" "}
                  {selectedOrder.deliveryAddress ||
                    "-"}
                </p>

                <p>
                  City:{" "}
                  {selectedOrder.deliveryCity ||
                    "-"}
                </p>

                <p>
                  PIN Code:{" "}
                  {selectedOrder.deliveryPincode ||
                    "-"}
                </p>

              </div>

            </div>

            {/* PRODUCTS */}

            <div className="mb-5">

              <h3 className="mb-3 font-bold text-[#172b4d]">
                Products
              </h3>

              <div className="space-y-3">

                {(selectedOrder.items || []).map(
                  (item) => (

                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border p-4"
                    >

                      <div>

                        <p className="font-semibold">
                          {item.product?.name ||
                            "Product unavailable"}
                        </p>

                        <p className="text-sm text-gray-500">
                          ₹{item.price} ×{" "}
                          {item.quantity}
                        </p>

                      </div>

                      <p className="font-bold">
                        ₹
                        {Number(
                          item.price || 0
                        ) *
                          Number(
                            item.quantity || 0
                          )}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* STATUS + TOTAL */}

            <div className="flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">

              <span
                className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(
                  selectedOrder.status
                )}`}
              >
                {getStatusText(
                  selectedOrder.status
                )}
              </span>

              <div className="text-lg font-bold">
                Total: ₹
                {selectedOrder.totalAmount}
              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Admin;