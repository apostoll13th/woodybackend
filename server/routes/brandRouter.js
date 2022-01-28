const Router = require('express');
const BrandController = require('../controllers/brandController');
const router = new Router();

router.get('/', BrandController.getAll);
router.post('/', BrandController.create);


module.exports = router;

