const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "please add a Name"],
        trim: true
    },
    sku: {
        type: String,
        required: true,
        default: "SKU",
        trim: true
    },
    category: {
        type: String,
        required: [true, "please add product category"],
        trim: true
    },
    quantity: {
        type: String,
        required: [true, "please add product quantity"],
        trim: true
    },
    price: {
        type: String,
        required: [true, "please add product price"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "please add product description"],
        trim: true
    },
    image: {
        type: Object,
        default: {}
    },

}, {

    timestamps: true,

});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product