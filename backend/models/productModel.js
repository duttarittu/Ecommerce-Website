const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"please Enter product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "please Enter product description"]
    },
    price:{
        type: Number,
        required:[true,"please Enter product price"],
        maxLength:[8, "price cannot exceed 8 character"]
    },
    ratings:{
        type: Number,
        default: 0
    },
    images: [
        {
            public_id:{
                type:String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
    
        }
    ],
    catagory: {
        type: String,
        required: [true,"please Enter product catagory"]
    },
    Stock: {
        type: Number,
        required:[true,"please Enter product stock"],
        maxLength:[4,"Stock cannot exceed 4 character"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name:{
                type: String,
                required: true,
            },
            rating:{
                type: Number,
                required: true,
            },
            comment:{
                type: String,
                required: true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    created:{
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Product",productSchema);