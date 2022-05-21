var userController = require('../controllers/userController')
const userSecurityPolicies = require('../policies/userSecurityPolicies')

module.exports = (Router) => {
	console.log('user router')
    Router.post('/register',
        userSecurityPolicies.register,
        userController.register
    )

    Router.post('/login', userController.login)
    Router.put('/update', userController.updateUserInfo)

    return Router

}