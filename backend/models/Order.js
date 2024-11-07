import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    }
  ],
  totalAmount: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
