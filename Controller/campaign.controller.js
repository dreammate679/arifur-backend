const Campaign = require('../Models/campaign.model');
const ErrorHandler = require('../Utlis/ErrorHandler');

// @desc    Create a new campaign
// @route   POST /api/campaigns
// @access  Public

exports.createCampaign = async (req, res,next) => {
    try {
        const campaign = await Campaign.create(req.body);

        res.status(201).json({ success: true, data: campaign });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public

exports.getCampaigns = async (req, res,next) => {
    try {
        const campaigns = await Campaign.find();

        res.status(200).json({ success: true, data: campaigns });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}

// @desc    Get a single campaign

// @route   GET /api/campaigns/:id

// @access  Public

exports.getCampaign = async (req, res,next) => {


    const { id } = req.params;

    try {
        const campaign = await Campaign.findById(id);

        if (!campaign) {
            return next(new ErrorHandler(`Campaign not found with id of ${id}`, 404));
        }

        res.status(200).json({ success: true, data: campaign });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}

// @desc    Update a campaign

// @route   PUT /api/campaigns/:id

// @access  Public

exports.updateCampaign = async (req, res,next) => {
    const { id } = req.params;

    try {
        const campaign = await Campaign
            .findByIdAndUpdate(id, req
                .body, {
                new: true,
                runValidators: true,
            });

        if (!campaign) {
            return next(new ErrorHandler(`Campaign not found with id of ${id}`, 404));
        }
        res.status(200).json({ success: true, data: campaign });
    }
    catch (error) {
        next(new ErrorHandler(error.message, 400));
    }

}

// @desc    Delete a campaign


// @route   DELETE /api/campaigns/:id

// @access  Public

exports.deleteCampaign = async (req, res,next) => {
    const { id } = req.params;

    try {
        const campaign = await Campaign.findByIdAndDelete(id);
        if (!campaign) {
            return next(new ErrorHandler(`Campaign not found with id of ${id}`, 404));
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}






