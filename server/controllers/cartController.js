import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) cart = await Cart.create({ userId, products: [] });
  return cart;
};

const populateCart = (cartId) => Cart.findById(cartId).populate('products.product');

export const getCart = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    res.json(await populateCart(cart._id));
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) {
      res.status(400);
      throw new Error('productId is required');
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    if (Number(quantity) < 1 || Number(quantity) > product.stock) {
      res.status(400);
      throw new Error('Quantity must be between 1 and available stock');
    }

    const cart = await getOrCreateCart(req.user._id);
    const item = cart.products.find((entry) => entry.product.toString() === productId);
    if (item) item.quantity = Math.min(item.quantity + Number(quantity), product.stock);
    else cart.products.push({ product: productId, quantity: Number(quantity) });

    await cart.save();
    res.status(201).json(await populateCart(cart._id));
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      res.status(400);
      throw new Error('productId and quantity are required');
    }

    const cart = await getOrCreateCart(req.user._id);
    const item = cart.products.find((entry) => entry.product.toString() === productId);
    if (!item) {
      res.status(404);
      throw new Error('Product is not in cart');
    }

    item.quantity = Math.max(1, Number(quantity));
    await cart.save();
    res.json(await populateCart(cart._id));
  } catch (error) {
    next(error);
  }
};

export const removeCartItem = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.products = cart.products.filter((entry) => entry.product.toString() !== req.params.id);
    await cart.save();
    res.json(await populateCart(cart._id));
  } catch (error) {
    next(error);
  }
};

export const mergeCart = async (req, res, next) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const cart = await getOrCreateCart(req.user._id);

    for (const it of items) {
      const productId = it.productId || it.product || it._id;
      const quantity = Number(it.quantity) || 1;
      if (!productId) continue;
      const product = await Product.findById(productId);
      if (!product) continue;
      const existing = cart.products.find((p) => p.product.toString() === productId.toString());
      if (existing) existing.quantity = Math.min(existing.quantity + quantity, product.stock);
      else cart.products.push({ product: productId, quantity: Math.min(quantity, product.stock) });
    }

    await cart.save();
    res.json(await populateCart(cart._id));
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (cart) {
    cart.products = [];
    await cart.save();
  }
};
