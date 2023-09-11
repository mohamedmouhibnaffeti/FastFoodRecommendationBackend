const mongoose = require('mongoose')

const FoodSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'food name is required'],
        minlength : [5, 'food name should be longer than 5 caracters']
    },
    price : {
        type : Number,
        requried : [true, 'pricing is required'],
    },
    restaurant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'restaurant',
        required : false
    }
})

const Food = mongoose.model('food', FoodSchema)
module.exports = Food