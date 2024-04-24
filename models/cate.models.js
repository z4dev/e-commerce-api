const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: String,
    description: String,
    status: {
        type: Boolean,
        default: true
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

