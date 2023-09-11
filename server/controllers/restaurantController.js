const Restaurant = require('../models/Restaurant')

module.exports.create_restaurant = async (req, res) =>{
    const {owner, name, food, location} = req.body
    try{
        const restaurant = await Restaurant.create({owner, name, food, location})
        res.status(200).json(restaurant)
    }catch(err){
        res.status(500).json({message : err.message})
    }
}

module.exports.get_all = async (req, res) =>{
    try{
        const restaurants = await Restaurant.find({})
        res.status(200).json(restaurants)
    }catch(err){
        res.status(500).json({message : err.message})
    }
}

module.exports.find_by_name = async(req, res) =>{
    const name = req.body.name
    try{
        const restaurants = await Restaurant.find({name})
        res.status(200).json(restaurants)
    }catch(err){
        res.status(500).json({message : err.message})
    }
}

module.exports.delete_restaurant = async (req, res) =>{
    try{
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id)
        res.status(200).json('restaurant deleted successfully')
    }catch(err){
        res.status(500).json({message : err.message})
    }
}