# ShopEZ MERN E-Commerce Application

ShopEZ is a complete MERN ecommerce platform with JWT authentication, role-based admin access, product browsing, cart checkout, order history, profile management, admin CRUD screens, analytics, seed data, and API testing artifacts.

## Folder Structure

```text
shopEZ/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── routes/
│   │   └── assets/
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── seed/
│   ├── postman/
│   ├── API_TESTING.md
│   ├── .env.example
│   └── server.js
└── README.md
```

## Features

- Register, login, logout, JWT protected routes, bcrypt password hashing
- USER and ADMIN roles
- Product listing, search, category filters, product details
- Cart add, update quantity, remove item
- Checkout and order generation
- User profile update and order history
- Admin product, user, and order management
- Admin dashboard cards and Chart.js charts
- MongoDB seed script with 20 sample products
- Postman collection and API testing guide

## Installation

### Backend

```bash
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

Set `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Set `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Frontend URL: `http://localhost:5173`

Backend URL: `http://localhost:5000`

## Demo Users

Created by `npm run seed`:

- Admin: `admin@shopez.com` / `password123`
- User: `user@shopez.com` / `password123`

## API Summary

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `PUT /api/auth/profile`

Products:

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/products/search?q=term`
- `GET /api/products/category/:category`

Cart:

- `GET /api/cart`
- `POST /api/cart/add`
- `PUT /api/cart/update`
- `DELETE /api/cart/remove/:id`

Orders:

- `POST /api/orders`
- `GET /api/orders/myorders`
- `GET /api/orders`
- `PUT /api/orders/:id`
- `DELETE /api/orders/:id`

Admin extras:

- `GET /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `GET /api/analytics/dashboard`

## Testing

Use [backend/API_TESTING.md](backend/API_TESTING.md) for sample requests and import [backend/postman/ShopEZ.postman_collection.json](backend/postman/ShopEZ.postman_collection.json) into Postman.

## Notes

- Product create/update/delete, user management, all-orders access, order status changes, and dashboard analytics require an ADMIN token.
- Images use public Unsplash URLs for seed/demo data.
- Payment is represented by `paymentStatus`; no payment gateway is integrated.
