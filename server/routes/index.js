const Router = require('express');
const deviceRouter = require('./deviceRouter.js');
const userRouter = require('./userRouter.js');
const brandRouter = require('./brandRouter.js');
const typeRouter = require('./typeRouter.js');
const router = new Router();


router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);


module.exports = router