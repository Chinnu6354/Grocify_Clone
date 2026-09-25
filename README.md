# 🛒 Grocify – Full Stack Grocery Shopping Application

### 🥦 A Modern Grocery Shopping Web Application

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

**🛍️ Browse Products • 🛒 Manage Cart • ❤️ Wishlist • 📦 Orders • 👨‍💼 Admin**

### 👨‍💼 Admin

- Admin Dashboard
- Add Products
- Update Products
- Delete Products
- Upload Product Images
- Manage Orders

</td>
</tr>
</table>

# 🖥️ Application Pages

| Page | Description |
|---|---|
| 🏠 Home | Grocery landing page |
| 🔐 Login | User authentication |
| 📝 Signup | Create a new account |
| 🔑 Forgot Password | Password recovery |
| 🛍️ Products | Browse grocery products |
| 🛒 Cart | Manage shopping cart |
| ❤️ Wishlist | Manage favourite products |
| 💳 Checkout | Place an order |
| 📦 My Orders | View previous orders |
| 📩 Contact | Contact the application |
| 👨‍💼 Admin | Manage products and orders |

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



🔄 Authentication Flow

┌─────────────┐
│    User     │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ React Login Page│
└────────┬────────┘
         │
         │ Axios
         ▼
┌──────────────────────┐
│ Spring Boot Auth API │
└──────────┬───────────┘
           │
           ▼
      ┌─────────┐
      │  MySQL  │
      └────┬────┘
           │
           ▼
      ┌─────────┐
      │JWT Token│
      └────┬────┘
           │
           ▼
┌──────────────────────┐
│ Protected API Calls  │
└──────────────────────┘

🛒 Shopping Flow

Browse Products
       │
       ▼
 Select Product
       │
       ▼
   Add to Cart
       │
       ▼
     Cart
       │
       ▼
   Checkout
       │
       ▼
   Place Order
       │
       ▼
    My Orders


🧰 Tech Stack
Frontend
| Technology      | Purpose                       |
| --------------- | ----------------------------  |
| ⚛️ React.js     | UI development               |
| ⚡ Vite          | Development & build tool    |
| 🎨 Tailwind CSS | Styling                      |
| 🧭 React Router | Client-side routing          |
| 📡 Axios        | API communication            |
| 🔄 Context API  | Application state management |
| 🟨 JavaScript   | Application logic            |

Backend

| Technology          | Purpose                        |
| ------------------- | ------------------------------ |
| ☕ Java              | Backend language              |
| 🌱 Spring Boot      | REST API                       |
| 🔐 Spring Security  | Authentication & authorization |
| 🎫 JWT              | Token authentication           |
| 🗄️ Spring Data JPA | Database access                 |
| 🐬 MySQL            | Database                       |


External Services

| Service       | Purpose               |
| ------------- | --------------------- |
| ☁️ Cloudinary | Product image storage |
| 📧 Gmail SMTP | Email / OTP           |



🧪 Testing

The application has been tested locally with the Spring Boot backend.

Tested Features
✅ Signup
✅ Login
✅ Product loading
✅ Cart
✅ Wishlist
✅ Checkout
✅ Orders
✅ Contact
✅ Admin functionality
✅ Frontend ↔ Backend communication


📱 Responsive Design

Grocify is designed for different screen sizes:

┌─────────────────────────────┐
│          Desktop            │
│                             │
└─────────────────────────────┘

        ┌─────────────┐
        │   Tablet    │
        │             │
        └─────────────┘

          ┌─────────┐
          │ Mobile  │
          │         │
          └─────────┘


👨‍💻 Author

Chinnu Pradhan
Full Stack Developer

Java • Spring Boot • React.js • Python • Django • MySQL • PostgreSQL • REST APIs

⭐ If you like this project, consider giving it a star!

Built with ❤️ using React.js

