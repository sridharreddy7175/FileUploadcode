const mongoose = require('mongoose')
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    productImage: { type: String }
})

module.exports = mongoose.model('products', ProductSchema)