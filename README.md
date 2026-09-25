# 🛒 Grocify – Full Stack Grocery Shopping Application

Grocify is a full-stack grocery shopping web application built with **React.js** on the frontend and **Spring Boot** on the backend.

The application allows users to browse grocery products, manage their cart and wishlist, place orders, and manage their account. It also includes authentication, OTP verification, password recovery, product management, and image storage using Cloudinary.

---

## 🚀 Features

### 👤 Authentication

- User Signup
- OTP verification
- User Login
- JWT-based authentication
- Forgot Password
- Forgot Password OTP verification
- Password Reset
- Protected routes

### 🛍️ Products

- View grocery products
- Product details
- Product categories
- Product images
- Admin product management
- Add products
- Update products
- Delete products

### 🛒 Shopping Cart

- Add products to cart
- Update product quantity
- Remove products from cart
- View cart total
- Cart persistence

### ❤️ Wishlist

- Add products to wishlist
- Remove products from wishlist
- View wishlist
- Move products between wishlist and cart

### 📦 Orders

- Checkout
- Place orders
- View previous orders
- Order details
- Order item management

### 📧 Email & OTP

- Email-based OTP verification
- Password reset through OTP
- Gmail SMTP integration

### 🖼️ Image Management

- Product image upload
- Cloudinary integration
- Cloud-hosted product images

### 📱 Responsive UI

- Desktop responsive design
- Tablet responsive design
- Mobile responsive design
- Responsive navigation bar

---

## 🏗️ Project Architecture

```text
                    ┌─────────────────────┐
                    │      React.js       │
                    │     Frontend        │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │     Spring Boot     │
                    │       Backend       │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
           MySQL          Cloudinary         Gmail
         Database        Image Storage       SMTP