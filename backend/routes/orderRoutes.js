const express = require('express');
const {addOrderItems,getMyOrders,getOrders,updateOrderStatus} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/', protect, admin, getOrders);
router.get('/myorders', protect, getMyOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router; 





















// const express = require('express');
// const { addOrderItems, getMyOrders, getOrders, updateOrderStatus } = require('../controllers/orderController');
// const { protect } = require('../middleware/authMiddleware');
// const { admin } = require('../middleware/adminMiddleware');

// const router = express.Router();

// router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
// router.route('/myorders').get(protect, getMyOrders);
// router.route('/:id/status').put(protect, admin, updateOrderStatus);

// module.exports = router;
