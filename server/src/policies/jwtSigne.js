const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
    /**
     * generate an access token
     * @param { Object } user 
     */
    generateAccessToken(user) {
        //const ONE_WEEK = 60 * 60 * 24 * 7
        const ONE_HOUR = 60 * 60
        return jwt.sign(user, config.AuthenticationSecret.jwtSecret, {
            expiresIn: ONE_HOUR
        })
    },
    verifyToken(token) {
        const ONE_HOUR = 60 * 60
        return jwt.verify(token, config.AuthenticationSecret.jwtSecret, {
            expiresIn: ONE_HOUR
        })
    },
    authenticateToken(req, res, next) {
        const token = req.headers['authorization']
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, config.AuthenticationSecret.jwtSecret, (err, user) => {
            if (err) return res.sendStatus(401)
            req.user = user
            next()
        })
    }
}