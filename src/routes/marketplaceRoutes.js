const express = require('express');
const router = express.Router();
const { getMarketplaceAssets, requestToBuy, negotiateRequest, acceptRequest, denyRequest, getUserRequests } = require('../controllers/marketplaceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getMarketplaceAssets);
router.post('/request/:id', protect, requestToBuy);
router.put('/negotiate/:id', protect, negotiateRequest);
router.put('/accept/:id', protect, acceptRequest);
router.put('/deny/:id', protect, denyRequest);
router.get('/requests', protect, getUserRequests);

module.exports = router;
