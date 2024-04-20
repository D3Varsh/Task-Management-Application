const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name:{
            type : String,
            required:[true,"Please Product name"]
        },
        quantity:{
            type : Number,
            required:true,
            default :0
        }
    }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;