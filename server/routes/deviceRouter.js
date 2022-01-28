const Router = require('express');
const DivaceController = require('../controllers/deviceController');
const router = new Router();


router.post('/', DivaceController.create)
router.get('/', DivaceController.getAll)
router.get('/:id', DivaceController.getOne)



module.exports = router