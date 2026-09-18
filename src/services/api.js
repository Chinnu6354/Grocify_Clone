import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

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

export default api;