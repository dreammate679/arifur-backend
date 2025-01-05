const Gallery = require('../Models/gallery.model');
const ErrorHandler = require('../Utlis/ErrorHandler');
const dotenv = require('dotenv').config({ path: 'backend/config/config.env' });

const cloudinary = require('cloudinary').v2;


const createAlbum = async (req, res,next) => {

    try {
        const album = await Gallery.create(req.body);

        res.status(201).json({ success: true, data: album });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
};

const getAlbums = async (req, res,next) => {

    try {
        const albums = await Gallery.find();

        res.status(200).json({ success: true, data: albums });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}

const getAlbum = async (req, res,next) => {
    const { id } = req.params;

    try {
        const album = await Gallery.findById(id);
        if (!album) {
            return next(new ErrorHandler(`Album not found with id of ${id}`, 404));
        }

        res.status(200).json({ success: true, data: album });
    }
    catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}

const updateAlbum = async (req, res,next) => {
    const { id } = req.params;

    try {
        let album = await Gallery.findById(id);
        if (!album) {
            return next(new ErrorHandler(`Album not found with id of ${id}`, 404));
        }

        album = await Gallery.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({ success: true, data: album });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}

const deleteAlbum = async (req, res,next) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const { id } = req.params;


    try {
        const album = await Gallery.findById(id);
        if (!album) {
            return next(new ErrorHandler(`Album not found with id of ${id}`, 404));
        }
        
         await cloudinary.api.delete_resources_by_prefix(`Arifur/Albums/${album.name}`);

        await Gallery.findByIdAndDelete(id);

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}

module.exports = {
    createAlbum,
    getAlbums,
    getAlbum,
    updateAlbum,
    deleteAlbum
};

