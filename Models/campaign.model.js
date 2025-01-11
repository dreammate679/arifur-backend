const {Schema,mongoose} = require('mongoose');

const campaignSchema = new Schema({
    title:{
        type:String,
       
    },
    place:{
        type:String,
       
    },
    time:{
        type:Date,
    },
    banner:{
        type:String,
       
    },
    content:{
        type:String,
       
    },
    status:{
        type:String,
        default:'active'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Campaign',campaignSchema);