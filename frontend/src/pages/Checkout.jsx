import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import API from '../api';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty, 0
  );

  const handlePayment = async () => {
    try {
      // STEP 1: Create Razorpay Order from Backend
      const orderRes = await fetch(`${API}/api/payment/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: totalPrice
        })
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.message || 'Order creation failed');
      }

      // STEP 2: Configure Razorpay Checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopNest',
        description: 'Test Transaction',
        order_id: orderData.id,

        // STEP 3: Handle Successful Payment
        handler: async function (response) {
          try {
            // Verify payment on Backend
            const verifyRes = await fetch(`${API}/api/payment/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(response)
            });

            if (!verifyRes.ok) {
              alert('Payment verification failed');
              return;
            }

            // STEP 4: Save Order in Database
            const saveOrderRes = await fetch(`${API}/api/orders`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id
              })
            });

            if (saveOrderRes.ok) {
              // STEP 5: Clear Cart and Redirect
              dispatch(clearCart());
              navigate('/ordersuccess');
            } else {
              alert('Order saving failed');
            }

          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Something went wrong while saving your order');
          }
        },

        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: '9999999999'
        },

        theme: {
          color: '#f97316'
        }
      };

      // STEP 6: Open Razorpay Checkout
      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded');
      }

      const rzp1 = new window.Razorpay(options);

      rzp1.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert(response.error.description || 'Payment Failed');
      });

      rzp1.open();

    } catch (error) {
      console.error('Checkout Error:', error);
      alert(error.message || 'Payment initialization failed');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    handlePayment();
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">

          <h3>Shipping Address</h3>

          <input type="text" placeholder="Full Name" required value={address.fullName} onChange={(e) =>
              setAddress({ ...address, fullName: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Street"
            required
            value={address.street}
            onChange={(e) =>
              setAddress({ ...address, street: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="City"
            required
            value={address.city}
            onChange={(e) =>
              setAddress({ ...address, city: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Postal Code"
            required
            value={address.postalCode}
            onChange={(e) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Country"
            required
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
          />

          <div className="checkout-summary">
            <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>

            <button type="submit" className="btn">
              Pay Now
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;
