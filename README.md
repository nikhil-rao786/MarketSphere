#  ShopNest – Full Stack E-Commerce Platform

ShopNest is a full-stack e-commerce web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. It provides a seamless online shopping experience with user authentication, product management, shopping cart, order management, and secure online payments through Razorpay.

## 🚀 Features

###  User Features
- User Registration and Login
- Browse and Explore Products
- Product Details and Reviews
- Add Products to Shopping Cart
- Update Product Quantities and Remove Items
- Secure Checkout Process
- Online Payment Integration using Razorpay
- Order Placement and Order History
- User Profile Management

### 🛠️ Admin Features
- Admin Dashboard
- Product Management (Add, Edit, Delete)
- Order Management
- User Management
- Sales and Analytics Dashboard

### 🔐 Authentication & Security
- User Authentication and Authorization
- Protected Routes
- Admin Access Control
- Secure Payment Signature Verification

## 💻 Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| State Management | Redux Toolkit |
| Authentication | JWT |
| Payment Gateway | Razorpay |
| Image Management | Cloudinary |
| API Testing | Postman |
| Version Control | Git & GitHub |

## 📂 Project Structure

```text
ShopNest/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── admin/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── styles/
│   └── package.json
│
├── ShopNest_Postman_Collection.json
├── package.json
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/nikhil-rao786/MarketSphere.git
```

```bash
cd MarketSphere
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Backend Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Add any additional environment variables required by your backend configuration.

### 4. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 5. Start the Application

Start the backend using the script configured in `backend/package.json`.

Start the frontend:

```bash
cd frontend
npm start
```

If your frontend uses a different start script, use the script specified in its `package.json`.

## 💳 Payment Integration

ShopNest integrates **Razorpay Payment Gateway** to enable online transactions.

Payment workflow:

1. User proceeds to checkout.
2. Backend creates a Razorpay order.
3. Frontend opens Razorpay Checkout.
4. User completes the payment.
5. Backend verifies the payment signature.
6. Order is saved after successful payment verification.

## 🧪 API Testing

The project includes a Postman collection:

`ShopNest_Postman_Collection.json`

Import this collection into Postman to test the available backend APIs.

## 🔮 Future Improvements

- Wishlist Functionality
- Advanced Product Filtering and Search
- Order Tracking
- Enhanced Payment and Refund Management
- Improved Responsive UI

## 👨‍💻 Author

**Nikhil Rao**

B.Tech | Chemical Engineering and Technology  
IIT (BHU), Varanasi

- GitHub: [nikhil-rao786](https://github.com/nikhil-rao786)

## ⭐ Show Your Support

If you like this project, consider giving it a ⭐ on GitHub!
