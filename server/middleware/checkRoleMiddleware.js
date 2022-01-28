const jwt = require('jsonwebtoken')
module.exports = function(role) {
   return  function (req,res,next) {
        if (req.method === 'OPTIONS') {
            next()
        }


        try {
            console.log(req.headers)
            const token = req.headers.authorization.split(' ')[1] // потому что первое слово это тип токена а вторая сам токен
            if (!token) {
                return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role == !role) {
                return res.status(403).json({message: 'у вас нету доступа'})
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({message: 'Не авторизован'})
        }
    }
}

