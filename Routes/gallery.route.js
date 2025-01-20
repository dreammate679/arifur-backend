const Express = require('express');
const router = Express.Router();

const { createAlbum, getAlbums, getAlbum, updateAlbum, deleteAlbum } = require('../Controller/gallery.controller.js');
const { isAuthenticatedMember } = require('../Middleware/checkAuth.js');

router.route('/create').post(createAlbum);
router.route('/get-all').get(getAlbums);
router.route('/get/:id').get(getAlbum);
router.route('/update/:id').put(updateAlbum);
router.route('/delete/:id').delete(deleteAlbum);

module.exports = router;
