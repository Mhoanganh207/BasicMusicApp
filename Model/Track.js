const mongoose = require('mongoose');
const Schema =mongoose.Schema;


const Track = new Schema(
    {
        name: {type: String, required: true},
        author: {type: String, required: true},
        linkurl: {type: String, required: true},
        imageurl: {type: String, required: true},
        index : {type: String, required: true}
    }
)


module.exports = mongoose.model('tracks', Track);