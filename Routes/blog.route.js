const Express = require('express');
const router = Express.Router();

const  { createBlog, getBlogs, getBlog, updateBlog, deleteBlog, createCategory, getCategories, getCategory, updateCategory, deleteCategory }=require('../Controller/blog.controller.js');
const { isAuthenticatedMember } = require('../Middleware/checkAuth.js');

router.route('/create').post(isAuthenticatedMember,createBlog);
router.route('/get-all').get(getBlogs);
router.route('/public/get-all').get(getBlogs);
router.route('/get/:id').get(getBlog);
router.route('/update/:id').put(isAuthenticatedMember,updateBlog);
router.route('/delete/:id').delete(isAuthenticatedMember,deleteBlog);




// category
router.route('/category/create').post(createCategory);
router.route('/category/get-all').get(getCategories);
router.route('/category/get/:id').get(getCategory);
router.route('/category/update/:id').put(updateCategory);
router.route('/category/delete/:id').delete(deleteCategory);


module.exports = router;




