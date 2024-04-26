const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'brand name is required'],
        unique: [true, 'brand name must be unique'],
        minlength: [3, 'brand name must be at least 3 characters long'],
        maxlength: [50, 'brand name must be at most 50 characters long']
    },
    // A and b => shoping.com/a-and-b
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
   

    image: String


    
}, {timestamps: true}); // timestamps: true adds createdAt and updatedAt fields


module.exports = mongoose.model('brand', brandSchema);
