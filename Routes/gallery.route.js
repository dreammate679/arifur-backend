const Express = require('express');
const router = Express.Router();

const { createAlbum, getAlbums, getAlbum, updateAlbum, deleteAlbum } = require('../Controller/gallery.controller.js');
const { isAuthenticatedMember } = require('../Middleware/checkAuth.js');

router.route('/create').post(isAuthenticatedMember,createAlbum);
router.route('/get-all').get(getAlbums);
router.route('/get/:id').get(getAlbum);
router.route('/update/:id').put(isAuthenticatedMember,updateAlbum);
router.route('/delete/:id').delete(isAuthenticatedMember,deleteAlbum);

module.exports = router;
