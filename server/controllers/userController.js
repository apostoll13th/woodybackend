const ApiError = require('../error/ApiError.js')
const { User, Basket } = require('../models/models')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const generateToken = (id,email,role) => {
    return JWT.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class UserController {
    async registations(req, res, next) {
        const { email, password, role } = req.body
            if (!email || !password ) {
                return next(ApiError.badRequest(`Некорректнрый email или пароль`))
            }
        const condidate = await User.findOne({where: {email}})
            if(condidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
        const hashPass = await bcrypt.hash(password,6)
        const user = await User.create({email: email, role, password:hashPass})
        const basket = await Basket.create({userId: user.id})
        const token = generateToken(user.id, user.email, user.role)
        return res.json({token})

    };

    async login(req, res,next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user){
            return next(ApiError.internalError('Пользователь не найден'))
        }
         let comparePass = await bcrypt.compareSync(password,user.password)
        if(!comparePass) {
            return next(ApiError.internalError('указан неверный пароль'))
        }
        const token = generateToken(user.id, user.email, user.role)
        return  res.json({token})
    };

    async check(req, res, next) {
        const token = generateToken(req.user.id, req.user.email, req.user.role)
        res.json({token})
    };
};

module.exports = new UserController();