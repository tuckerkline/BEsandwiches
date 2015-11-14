var mongoose = require('mongoose')

var sandwichSchema = mongoose.Schema({
    name            : { type: String, required: true, unique: true },
    creator         : { type: String },
    ingredients     : { type: Array, required: true },
    recipe          : { type: String, required:  true},
    picture         : { type: String, required: true},
    comments        : { type: Array, default: []}
});

module.exports = mongoose.model('sandwich', sandwichSchema)