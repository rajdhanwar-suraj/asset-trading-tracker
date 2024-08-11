const Asset = require('../models/assetModel');
const User = require('../models/userModel');
const { calculateAverageTradingPrice } = require('../services/assetService');

exports.createAsset = async (req, res) => {
    try {
        const { name, description, image, status } = req.body;
        const asset = await Asset.create({
            name,
            description,
            image,
            status,
            creator: req.user.id,
            currentHolder: req.user.id,
            tradingJourney: [{ holder: req.user.id }]
        });
        res.status(201).json({ message: 'Asset created successfully', assetId: asset._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateAsset = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        if (asset.creator.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        const updates = req.body;
        const updatedAsset = await Asset.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.status(200).json({ message: 'Asset updated successfully', assetId: updatedAsset._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAssetDetails = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id).populate('creator currentHolder tradingJourney.holder');
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        res.status(200).json(asset);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserAssets = async (req, res) => {
    try {
        const assets = await Asset.find({ currentHolder: req.user.id });
        res.status(200).json(assets);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.publishAsset = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        if (asset.creator.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        asset.status = 'published';
        await asset.save();
        res.status(200).json({ message: 'Asset published successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
