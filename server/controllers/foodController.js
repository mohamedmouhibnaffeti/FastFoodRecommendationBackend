const Food = require('../models/Food')

module.exports.create_food = async (req, res) =>{
    const {name, price, restaurant} = req.body
    try{
        const food = await Food.create({name, price, restaurant})
        res.status(200).json({message : 'Food created successfully',
                                  Food : food 
                                 })
    }catch(err){
        res.status(500).json({message : err.message})
    }
}

module.exports.get_foods = async (req, res) =>{
    try{
        const foods = await Food.find().populate("restaurant")
        res.status(200).json(foods)
    }catch(err){
        res.status(500).json({message : err.message})
    }
}

module.exports.get_by_name = async (req, res) =>{
    try{
        const foods = await Food.find({name : req.body.name})
        res.status(200).json(foods)
    }catch(err){
        res.status(500).json({message : err.message})
    }
}

module.exports.update_food = async (req, res) =>{
    const id = req.params.id
    const {name, price, restaurant} = req.body
    try{
        const food = await Food.findByIdAndUpdate(id, {name, price, restaurant})
        const updatedFood = await Food.findById(food.id)
        res.status(200).json(updatedFood)
    }catch(err){
        res.status(500).json({message : err.message})
    }
}

module.exports.delete_food = async (req, res) =>{
    const id = req.params.id
    try{
        const food = await Food.findByIdAndDelete(id)
        res.status(200).json({message : 'Food deleted successfully'})
    }catch(err){
        res.status(500).json({message : err.message})
    }
}

module.exports.get_by_id = async (req, res) =>{
    const id = req.params.id
    try{
        const food = await Food.findById(id)
        res.status(200).json(food)
    }catch(err){
        res.status(500).json({message : err.message})
    }
}