
# 🌾 FarmConnect

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![MERN Stack](https://img.shields.io/badge/stack-MERN-blue)]()
[![Made With](https://img.shields.io/badge/Made%20with-❤️-red)]()

**FarmConnect** is a MERN stack-based web application that connects **farmers** and **buyers** directly. Farmers can list their agricultural products while buyers can browse, add to cart, and place orders with ease.

---

## 🚀 Features

### 👨‍🌾 Farmer
- Add, edit, and delete farm products
- View and manage orders received
- View buyer details
- Update order status (Pending → Accepted/Rejected/Delivered)

### 🛒 Buyer
- Browse farm products
- Add to cart
- Checkout and place orders
- View order history and track status

### 🔐 Authentication
- Role-based access (Farmer, Buyer)
- Protected routes via JWT & Cookies
- Session persistence

---

## 🛠️ Tech Stack

| Layer     | Tech Stack                             |
|-----------|----------------------------------------|
| Frontend  | React, Tailwind CSS, React Router, Axios |
| Backend   | Node.js, Express.js                    |
| Database  | MongoDB with Mongoose ODM              |
| Auth      | JWT + Cookie-Session                   |
| UI/UX     | React Toastify, Lucide Icons           |

---

## 📂 Folder Structure

```
FarmConnect/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── public/
├── .env
├── README.md
```

---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js & npm
- MongoDB
- Git

### 🔧 Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/farmconnect
JWT_SECRET=your_jwt_secret
```

Run backend:
```bash
npm run dev
```

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

---

## 📦 Sample Users

### 👨‍🌾 Farmer
```json
{
  "role": "Farmer",
  "email": "farmer@example.com",
  "password": "password123"
}
```

### 🛍️ Buyer
```json
{
  "role": "Buyer",
  "email": "buyer@example.com",
  "password": "password123"
}
```

---

## 📄 API Overview

| Method | Route                  | Role     | Description                  |
|--------|------------------------|----------|------------------------------|
| POST   | `/api/auth/register`   | Public   | Register user (Buyer/Farmer) |
| POST   | `/api/auth/login`      | Public   | Login and get cookie         |
| GET    | `/api/products`        | Public   | View all products            |
| POST   | `/api/products`        | Farmer   | Add product                  |
| GET    | `/api/products/my`     | Farmer   | View own products            |
| PUT    | `/api/products/:id`    | Farmer   | Edit product                 |
| DELETE | `/api/products/:id`    | Farmer   | Delete product               |
| POST   | `/api/orders`          | Buyer    | Place order                  |
| GET    | `/api/orders/buyer`    | Buyer    | View buyer’s orders          |
| GET    | `/api/orders/farmer`   | Farmer   | View farmer’s received orders |
| PUT    | `/api/orders/:id`      | Farmer   | Update order status          |

---

## 🖼️ Screenshots

> (You can add images here later)

---

## 💡 Future Enhancements

- Payment integration (Razorpay / Stripe)
- Delivery tracking
- Rating & feedback system
- Admin dashboard
- PWA support

---

## 👨‍💻 Author

- Aman Verma — Full Stack Developer  

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

> If you found this project helpful, give it a ⭐ on GitHub!
