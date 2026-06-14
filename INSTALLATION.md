# ShopEZ Installation Guide

## Requirements

- Node.js 18 or newer
- MongoDB Atlas connection string
- npm

## 1. Configure Backend

```bash
cd backend
npm install
copy .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<database>
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Seed the database:

```bash
npm run seed
```

Start the API:

```bash
npm run dev
```

## 2. Configure Frontend

Open a second terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Visit `http://localhost:5173`.

## 3. Verify

1. Login as `admin@shopez.com` with `password123`.
2. Open `/admin/dashboard` to verify analytics.
3. Browse `/products`, add a product to cart, and checkout.
4. Open `/orders` to verify order history.

## 4. Postman

Import `backend/postman/ShopEZ.postman_collection.json`.

After login, copy the returned JWT into the collection variable named `token`.
