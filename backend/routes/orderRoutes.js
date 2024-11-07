
import express from 'express';
import Order from '../models/Order.js';
import axios from 'axios';

const router = express.Router();

router.post('/payment', async (req, res) => {
  try {
    const { paymentInfo, orderDetails } = req.body;

    // a successful payment:
    const paymentSuccess = true; // payment is successful

    if (paymentSuccess) {
      const newOrder = new Order(orderDetails);
      await newOrder.save();
      res.status(200).json({ message: 'Payment successful', success: true });
    } else {
      res.status(500).json({ message: 'Payment failed', success: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', success: false });
  }
});

export default router;
