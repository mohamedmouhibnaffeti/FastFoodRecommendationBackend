const { Router } = require('express')
const restaurantController = require('../controllers/restaurantController')
const router = Router()

router.post('/create', restaurantController.create_restaurant)
router.get('/get_all', restaurantController.get_all)
router.post('/find_by_name', restaurantController.find_by_name)
router.delete('/delete/:id', restaurantController.delete_restaurant)
module.exports = router