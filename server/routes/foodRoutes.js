const {Router} = require('express')
const foodController = require('../controllers/foodController')
const router = Router()
let id
router.get('/all', foodController.get_foods )
router.post('/create', foodController.create_food)
router.post('/search', foodController.get_by_name)
router.post('/update/:id', foodController.update_food)
router.delete('/delete/:id', foodController.delete_food)
router.get('/get_by_id/:id', foodController.get_by_id)
module.exports = router