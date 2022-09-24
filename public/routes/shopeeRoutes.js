const router = require('express').Router();
const shopeeController = require('../controllers/shopeeController');

router.post('/', shopeeController.createKey);
router.get('/', shopeeController.refreshToken);
router.post('/orders', shopeeController.addShopeeOrders);
router.post('/download', shopeeController.downloadShippingDocument);
router.get('/tracking', shopeeController.getTrackingInfo);
module.exports = router;
