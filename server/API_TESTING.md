# ShopEZ API Testing Guide

Base URL: `http://localhost:5000`

## Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Run `npm install`.
3. Run `npm run seed` to create 20 products plus demo users.
4. Run `npm run dev`.

Demo accounts:

- Admin: `admin@shopez.com` / `password123`
- User: `user@shopez.com` / `password123`

## Auth Flow

Register:

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Jane Buyer",
  "email": "jane@example.com",
  "password": "password123"
}
```

Login:

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@shopez.com",
  "password": "password123"
}
```

Use the returned `token` as:

```http
Authorization: Bearer <token>
```

## Common Requests

- `GET /api/products`
- `GET /api/products/search?q=laptop`
- `GET /api/products/category/Electronics`
- `POST /api/cart/add`
- `PUT /api/cart/update`
- `DELETE /api/cart/remove/:id`
- `POST /api/orders`
- `GET /api/orders/myorders`

Admin-only:

- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/users`
- `GET /api/orders`
- `GET /api/analytics/dashboard`

Import `postman/ShopEZ.postman_collection.json` into Postman for ready-to-run requests.
