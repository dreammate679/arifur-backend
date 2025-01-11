const Express = require('express');
const router = Express.Router();

const {getStats}=require('../Controller/stat.controller');

router.route('/stats').get(getStats);

module.exports = router;




