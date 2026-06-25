import express from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get user orders
router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create order
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { shippingAddress, billingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    let subtotal = 0;
    cart.items.forEach(item => {
      subtotal += item.price * item.quantity;
    });

    const tax = Math.round(subtotal * 0.18);
    const shipping = subtotal > 999 ? 0 : 99;
    const discount = cart.coupon?.discount || 0;
    const total = subtotal + tax + shipping - discount;

    const order = new Order({
      user: req.user.id,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal,
      tax,
      shipping,
      discount,
      total,
      shippingAddress,
      billingAddress,
      paymentMethod,
      paymentStatus: 'completed', // Dummy payment
      orderStatus: 'confirmed',
    });

    await order.save();

    // Clear cart
    cart.items = [];
    cart.coupon = {};
    await cart.save();

    res.status(201).json({
      order,
      message: 'Order placed successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
