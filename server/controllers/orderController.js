import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { requireFields } from '../utils/validators.js';
import { SERVICE_STATION, getDeliveryEligibility } from '../utils/deliveryZone.js';
import { clearCart } from './cartController.js';

export const getDeliveryZone = (_req, res) => {
  res.json(SERVICE_STATION);
};

export const createOrder = async (req, res, next) => {
  try {
    const missing = requireFields(req.body.shippingAddress || {}, ['name', 'address', 'city', 'state', 'postalCode', 'phone', 'latitude', 'longitude']);
    if (missing) {
      res.status(400);
      throw new Error(`Shipping address: ${missing}`);
    }

    const delivery = getDeliveryEligibility(req.body.shippingAddress);
    if (!delivery.eligible) {
      res.status(400);
      throw new Error(
        delivery.distanceKm === null
          ? 'Delivery location is required'
          : `Delivery is available only within ${SERVICE_STATION.radiusKm} km of ${SERVICE_STATION.name}. Your location is ${delivery.distanceKm} km away.`
      );
    }

    const cart = await Cart.findOne({ userId: req.user._id }).populate('products.product');
    if (!cart || cart.products.length === 0) {
      res.status(400);
      throw new Error('Cart is empty');
    }

    const orderProducts = cart.products.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity
    }));

    const totalAmount = orderProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

    for (const item of cart.products) {
      const product = await Product.findById(item.product._id);
      if (product.stock < item.quantity) {
        res.status(400);
        throw new Error(`${product.name} does not have enough stock`);
      }
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      userId: req.user._id,
      products: orderProducts,
      totalAmount,
      shippingAddress: {
        ...req.body.shippingAddress,
        distanceKm: delivery.distanceKm
      }
    });

    await clearCart(req.user._id);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (_req, res, next) => {
  try {
    const orders = await Order.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    if (req.body.paymentStatus) order.paymentStatus = req.body.paymentStatus;
    if (req.body.orderStatus) order.orderStatus = req.body.orderStatus;

    res.json(await order.save());
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    await order.deleteOne();
    res.json({ message: 'Order removed' });
  } catch (error) {
    next(error);
  }
};
