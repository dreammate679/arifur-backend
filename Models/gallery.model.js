const {mongoose,Schema} = require('mongoose');

const gallerySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    banner: {
        type: String,
    },

    images: [
        {
            type: String,
        },
    ],
});

module.exports = mongoose.model('Gallery', gallerySchema);
