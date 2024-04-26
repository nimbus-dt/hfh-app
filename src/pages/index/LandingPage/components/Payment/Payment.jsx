import { Link } from '@aws-amplify/ui-react';
import { initializePaddle } from '@paddle/paddle-js';
import { useState, useEffect } from 'react';

function Payment() {
  const [paddle, setPaddle] = useState();

  // Download and initialize Paddle instance from CDN
  useEffect(() => {
    initializePaddle({
      token: 'live_3d51399265a46a47ffdb330461b',
    }).then((paddleInstance) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  // Callback to open a checkout
  const openCheckout = () => {
    paddle?.Checkout.open({
      items: [{ priceId: 'pri_01hwarjdsd1b0be8htmaghwgr5', quantity: 1 }],
    });
  };
  return (
    <Link
      style={{
        textDecoration: 'none',
        color: 'gray',
      }}
      to="#"
      onClick={() => {
        openCheckout();
      }}
    >
      Payment
    </Link>
  );
}

export default Payment;
