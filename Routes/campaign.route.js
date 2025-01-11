const Express = require('express');
const router = Express.Router();

const {createCampaign,getCampaigns,getCampaign,updateCampaign,deleteCampaign} = require('../Controller/campaign.controller');
const { isAuthenticatedMember } = require('../Middleware/checkAuth');


router.route('/create').post(isAuthenticatedMember,createCampaign);
router.route('/get-all').get(getCampaigns);
router.route('/get/:id').get(getCampaign);
router.route('/update/:id').put(isAuthenticatedMember,updateCampaign);
router.route('/delete/:id').delete(isAuthenticatedMember,deleteCampaign);

module.exports = router;






