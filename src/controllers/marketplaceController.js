const Asset = require('../models/assetModel');
const Request = require('../models/requestModel');
const { calculateNewAverage } = require('../services/marketplaceService');

exports.getMarketplaceAssets = async (req, res) => {
    try {
        const assets = await Asset.find({ status: 'published' }).populate('currentHolder');
        res.status(200).json(assets);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.requestToBuy = async (req, res) => {
    try {
        const { proposedPrice } = req.body;
        const asset = await Asset.findById(req.params.id);
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        const request = await Request.create({
            asset: req.params.id,
            buyer: req.user.id,
            proposedPrice
        });
        asset.proposals += 1;
        await asset.save();
        res.status(201).json({ message: 'Purchase request sent' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.negotiateRequest = async (req, res) => {
    try {
        const { newProposedPrice } = req.body;
        const request = await Request.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        request.proposedPrice = newProposedPrice;
        await request.save();
        res.status(200).json({ message: 'Negotiation updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.acceptRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id).populate('asset buyer');
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        if (request.asset.currentHolder.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        request.status = 'accepted';
        request.asset.currentHolder = request.buyer._id;
        request.asset.tradingJourney.push({
            holder: request.buyer._id,
            price: request.proposedPrice
        });
        request.asset.lastTradingPrice = request.proposedPrice;
        request.asset.averageTradingPrice = calculateNewAverage(request.asset.tradingJourney);
        request.asset.numberOfTransfers += 1;
        await request.save();
        await request.asset.save();
        res.status(200).json({ message: 'Request accepted, holder updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.denyRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        if (request.asset.currentHolder.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        request.status = 'denied';
        await request.save();
        res.status(200).json({ message: 'Request denied' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserRequests = async (req, res) => {
    try {
        const requests = await Request.find({ buyer: req.user.id }).populate('asset');
        res.status(200).json(requests);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
