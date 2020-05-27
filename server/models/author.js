const mongoose = require('mongoose');
const schema = mongoose.Schema;

const authorModel = new schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Author', authorModel );