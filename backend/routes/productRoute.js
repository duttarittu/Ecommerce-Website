const express = require('express');
const { getAllProduct,createProduct, updateProduct, deleteProduct, getProductDetails, creteProductReview, getProductReviews, deleteReview } = require('../controllers/productController');
const { isAuthenticatedUser,authorizeRole, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route('/products').get( getAllProduct);


// router
//   .route("/admin/products")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
.route('/product/new')
.post(isAuthenticatedUser,createProduct);

router.route("/admin/product/:id")
.put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
.delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser,creteProductReview)
router.route("/reviews").get(getProductReviews).delete(deleteReview);
module.exports = router;