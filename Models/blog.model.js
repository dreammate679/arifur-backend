const {mongoose, Schema} = require('mongoose');

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: true,
    },
    
    date: {
        type: Date,
        default: Date.now,
    },
    
    content: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Blog', blogSchema);

