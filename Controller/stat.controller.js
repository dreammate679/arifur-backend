const Blog = require('../Models/blog.model');
const Callery = require('../Models/gallery.model');
const Campaign = require('../Models/campaign.model');

const ErrorHandler = require('../Utlis/ErrorHandler');

exports.getStats = async (req, res, next) => {
    try {
        const blogCount = await Blog.countDocuments();
        const galleryCount = await Callery.countDocuments();
        const campaignCount = await Campaign.countDocuments();

        res.status(200).json({
            success: true,
            data: {
                blogCount,
                galleryCount,
                campaignCount
            }
        })
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}
