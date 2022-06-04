const Router = require('express').Router()

var userController = require('../controllers/userController')
const userSecurityPolicies = require('../policies/userSecurityPolicies')


Router.post('/register',
    userSecurityPolicies.register,
    userController.register
)

Router.post('/login', userController.login)
Router.put('/update', userController.updateUserInfo)
Router.post('/favorie', userController.addFavorie)
module.exports = Router