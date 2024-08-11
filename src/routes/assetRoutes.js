const express = require('express');
const router = express.Router();
const { createAsset, updateAsset, getAssetDetails, getUserAssets, publishAsset } = require('../controllers/assetController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createAsset);
router.put('/update/:id', protect, updateAsset);
router.get('/:id', protect, getAssetDetails);
router.get('/', protect, getUserAssets);
router.put('/publish/:id', protect, publishAsset);

module.exports = router;
