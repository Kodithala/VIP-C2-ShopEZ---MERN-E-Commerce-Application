import express from 'express';
import { addToCart, getCart, removeCartItem, updateCartItem, mergeCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.post('/merge', protect, mergeCart);
router.put('/update', protect, updateCartItem);
router.delete('/remove/:id', protect, removeCartItem);

export default router;
