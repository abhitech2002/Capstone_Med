const JWT = require('jsonwebtoken')

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization

    JWT.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err){
            return res.status(401).json({
                error: "Unauthoried"
            })
        }
        req.user = decoded
        next()
    })
}

module.exports = isAuthenticated