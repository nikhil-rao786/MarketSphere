
const express = require('express');

const {getProducts,getProductById,createProduct,updateProduct,deleteProduct} = require('../controllers/productController');

const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Get all products
router.get('/', getProducts);

// Create a new product (Admin only)
router.post('/',protect,admin,upload.single('image'),createProduct);

// Get single product
router.get('/:id', getProductById);

// Update product (Admin only)
router.put('/:id',protect,admin,upload.single('image'),updateProduct);

// Delete product (Admin only)
router.delete('/:id',protect,admin,deleteProduct);

module.exports = router;














// const express = require('express');
// const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
// const { protect } = require('../middleware/authMiddleware');
// const { admin } = require('../middleware/adminMiddleware');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// const router = express.Router();

// router.route('/').get(getProducts).post(protect, admin, upload.single('image'), createProduct);
// router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);

// module.exports = router;
