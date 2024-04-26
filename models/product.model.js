const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
        type: String,
        required: [true, "Product name is required"],
        unique: [true, "Product name must be unique"],
        minlength: [2, "Product name must be at least 3 characters long"],
        maxlength: [50, "Product name must be at most 50 characters long"],
        trim: true,
        },
    
        slug: {
        type: String,
        unique: true,
        lowercase: true,
        },
    
        description: {
        type: String,
        required: [true, "Product description is required"],
        minlength: [10, "Product description must be at least 10 characters long"],
        maxlength: [5000, "Product description must be at most 5000 characters long"],
        },
    
        price:{
        type: Number,
        required: [true, "Product price is required"],
        min: [1, "Product price must be at least 1"],
        max: [1000000, "Product price must be at most 1000000"],
        },
        priceDiscount:{
        type: Number,
        min: [1, "Product priceDiscount must be at least 1"],
        max: [1000000, "Product priceDiscount must be at most 1000000"],
        },
        quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
        min: [1, "Product quantity must be at least 1"],
        max: [1000000, "Product quantity must be at most 1000000"],
        },
    
        sold: {
        type: Number,
        default: 0,
        },

        imageCover: {
        type: String,
        required: [true, "Product imageCover is required"],
        },
        images: {type: [String]} , 
        
    
        category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "Category is required"],
        },
    
        subcategory: {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
        required: [true, "SubCategory is required"],
        },
    
        color: {
        type: [String],
        required: [true, "Color is required"],
        
        },
    
        brand: {
        type: mongoose.Schema.ObjectId,
        ref: "Brand",
        required: [true, "Brand is required"],
        },
        ratingsAverage: {
        type: Number,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating must be at most 5"],
        },
        ratingsQuantity: {
        type: Number,
        default: 0,
        },

    
    } , {timestamps: true})



module.exports = mongoose.model("Product", productSchema);