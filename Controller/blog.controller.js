const Blog = require('../Models/blog.model');
const Category = require('../Models/category.model');
const ErrorHandler = require('../Utlis/ErrorHandler');

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Public
exports.createBlog = async (req, res,next) => {
    
    
    try {
        const blog = await Blog.create(req.body);

        res.status(201).json({ success: true, data: blog });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res,next) => {
    const {category} = req.query;
    try {
            const blogs = category 
                ? await Blog.find({ 'category.value': category })
                : await Blog.find(); // Get all blogs if no category is specified
        
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
};

// @desc    Get a single blog
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlog = async (req, res,next) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return next(new ErrorHandler(`Blog not found with id of ${id}`, 404));
        }

        res.status(200).json({ success: true, data: blog });
    }
    catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Public
exports.updateBlog = async (req, res,next) =>{
    const { id } = req.params;

    try {
        const blog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        
        if (!blog) {
            return next(new ErrorHandler(`Blog not found with id of ${id}`, 404));
        }

        res.status(200).json({ success: true, data: blog });
    }
    catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Public

exports.deleteBlog = async (req, res,next) => {
    const { id } = req.params;

    try {
        const blog= await Blog.findByIdAndDelete(id);
        if (!blog) {
            return next(new ErrorHandler(`Blog not found with id of ${id}`, 404));
        }

        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}


// @desc    Create a new category
// @route   POST /api/categories
// @access  Public
exports.createCategory = async (req, res,next) => {
    const { name, description } = req.body;

    try {
        const category = await Category.create({
            name,
            description,
        });

        res.status(201).json({ success: true, data: category });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res,next) => {
    try {
        const categories = await Category.find();

        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
};

// @desc    Get a single category
// @route   GET /api/categories/:id
// @access  Public
exports.getCategory = async (req, res,next) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return next(new ErrorHandler(`Category not found with id of ${id}`, 404));
        }

        res.status(200).json({ success: true, data: category });
    }
    catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Public
exports.updateCategory = async (req, res,next) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndUpdate
        (id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!category) {
            return next(new ErrorHandler(`Category not found with id of ${id}`, 404));
        }

        res.status(200).json({ success: true, data: category });
    }
    catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Public
exports.deleteCategory = async (req, res,next) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return next(new ErrorHandler(`Category not found with id of ${id}`, 404));
        }

        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}    






