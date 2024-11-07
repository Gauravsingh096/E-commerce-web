import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './CheckoutPage.css'; // Import CSS file

function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const handlePayment = async () => {
    const order = {
      products: [{ productId: product._id, quantity: 1 }],
      totalAmount: product.price,
    };

    try {
      const { data } = await axios.post('/api/orders/payment', { paymentInfo: {}, orderDetails: order });
      if (data.success) {
        navigate('/payment-result', { state: { success: true } });
      } else {
        navigate('/payment-result', { state: { success: false } });
      }
    } catch (error) {
      console.error('Payment failed:', error);
      navigate('/payment-result', { state: { success: false } });
    }
  };

  if (!product) return <div className="empty-checkout">No items to checkout</div>;

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-details">
        <p><strong>Product:</strong> {product.name}</p>
        <p><strong>Total Amount:</strong> ${product.price}</p>
      </div>
      <button className="confirm-button" onClick={handlePayment}>Confirm Payment</button>
    </div>
  );
}

export default CheckoutPage;
