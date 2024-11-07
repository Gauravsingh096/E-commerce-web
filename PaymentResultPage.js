import React, { useEffect, useState } from 'react';

function PaymentResultPage() {
  const [paymentStatus, setPaymentStatus] = useState(null);

  // mock payment
  useEffect(() => {
    const simulatePayment = () => {
      const success = Math.random() > 0.6;  
      setPaymentStatus(success);
    };

    simulatePayment();
  }, []);

  if (paymentStatus === null) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container">
      {paymentStatus ? (
        <h2>Payment Successful!</h2>
      ) : (
        <h2>Payment Failed. Please try again.</h2>
      )}
      <a href="/" className="btn">Return to Home</a>
    </div>
  );
}

export default PaymentResultPage;
