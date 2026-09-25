import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==================== AUTH ====================


// Login
export const loginUser = (user) => {
  return api.post("/auth/login", user);
};


// ==================== PRODUCTS ====================

// Get all products
export const getProducts = () => {
  return api.get("/products");
};

// Create a product
export const createProduct = (product) => {
  return api.post("/products", product);
};

// Update a product
export const updateProduct = (id, product) => {
  return api.put(`/products/${id}`, product);
};

// Delete a product
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};

// ==================== CART ====================

// Add product to cart
export const addToCart = (productId, quantity) => {
  return api.post("/cart", {
    productId,
    quantity,
  });
};

// Get current user's cart
export const getCart = () => {
  return api.get("/cart");
};

 // Remove product from cart
export const removeFromCart = (productId) => {
  return api.delete(`/cart/${productId}`);
};

// Update cart item quantity
export const updateCartQuantity = (productId, quantity) => {
  return api.put(`/cart/${productId}?quantity=${quantity}`);
};

export const placeOrder = (
  email,
  deliveryName,
  deliveryPhone,
  deliveryAddress,
  deliveryCity,
  deliveryPincode,
  paymentMethod
) => {
  return api.post(
    `/orders?email=${encodeURIComponent(email)}` +
    `&deliveryName=${encodeURIComponent(deliveryName)}` +
    `&deliveryPhone=${encodeURIComponent(deliveryPhone)}` +
    `&deliveryAddress=${encodeURIComponent(deliveryAddress)}` +
    `&deliveryCity=${encodeURIComponent(deliveryCity)}` +
    `&deliveryPincode=${encodeURIComponent(deliveryPincode)}` +
    `&paymentMethod=${encodeURIComponent(paymentMethod)}`
  );
};

export const getAllOrders = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return api.get(
    `/orders/admin?email=${encodeURIComponent(user.email)}`
  );
};

export const updateOrderStatus = (
  orderId,
  status
) => {

  const storedUser =
    localStorage.getItem("user");

  const user = JSON.parse(storedUser);

  return api.put(
    `/orders/${orderId}/status` +
    `?status=${encodeURIComponent(status)}` +
    `&email=${encodeURIComponent(user.email)}`
  );
};


// ==================== WISHLIST ====================

// Get current user's wishlist
export const getWishlist = () => {
  return api.get("/wishlist");
};

// Add product to wishlist
export const addToWishlist = (productId) => {
  return api.post(`/wishlist/${productId}`);
};

// Remove product from wishlist
export const removeFromWishlist = (productId) => {
  return api.delete(`/wishlist/${productId}`);
};

// Check whether product is in wishlist
export const checkWishlist = (productId) => {
  return api.get(`/wishlist/${productId}`);
};

// ==================== IMAGE UPLOAD ====================

export const uploadProductImage = (file) => {
  const formData = new FormData();

  formData.append("file", file);

  return api.post("/products/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ==================== CONTACT ====================

// Send contact message
export const sendContactMessage = (contactMessage) => {
  return api.post("/contact", contactMessage);
};

// ==================== CONTACT MESSAGES ====================

// Get all contact messages - Admin
export const getContactMessages = () => {
  return api.get("/contact");
};

// Delete contact message - Admin
export const deleteContactMessage = (id) => {
  return api.delete(`/contact/${id}`);
};

// Signup
export const signupUser = (user) => {
  return api.post("/auth/signup", user);
};

// Signup - Send OTP
export const sendSignupOtp = (email) => {
  return api.post("/auth/signup/send-otp", {
    email,
  });
};

// Signup - Verify OTP
export const verifySignupOtp = (signupData) => {
  return api.post("/auth/signup/verify-otp", signupData);
};

// ==================== FORGOT PASSWORD ====================

// Send OTP to existing user's email
export const sendForgotPasswordOtp = (email) => {
  return api.post("/auth/forgot-password/send-otp", {
    email,
  });
};

// Verify forgot password OTP
export const verifyForgotPasswordOtp = (email, otp) => {
  return api.post("/auth/forgot-password/verify-otp", {
    email,
    otp,
  });
};

// Reset password
export const resetPassword = (
  email,
  newPassword,
  confirmPassword
) => {
  return api.post("/auth/forgot-password/reset", {
    email,
    newPassword,
    confirmPassword,
  });
};

export default api;