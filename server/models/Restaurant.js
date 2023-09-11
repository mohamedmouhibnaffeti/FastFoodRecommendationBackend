const mongoose = require('mongoose')

const RestaurantSchema = mongoose.Schema({
    owner : {
        type : String,
        required : [true, 'owner is required'],
        minlength : [6, 'the owner name should be longer than 6 caracters']
    },
    name : {
        type : String,
        required : [true, 'name is required'],
        unique : true,
        minlength : [6, 'restaurant name should be longer than 6 caracters']
    },
    location : {
        type : String
    }
})

const Restaurant = mongoose.model('restaurant', RestaurantSchema)
module.exports = Restaurant