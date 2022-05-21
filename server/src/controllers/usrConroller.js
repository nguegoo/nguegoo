/* eslint-disable no-unused-vars */
const User = require('../models/User')
const hash = require('../policies/hash')
const jwtSigne = require('../policies/jwtSigne')

module.exports = {

    register (req, res) {

        const user = new User(req.body)
        
        hash.bHash(req.body.password)
        .then(result => {
            user.password = result
            user.save()
            res.send(user)
        })
    },

    login (req, res) {
        const { email, password } = req.body
        User.findOne({
            email: email
        }).then(user => {

            if(user != null) {
                hash.bCompare(req.body.password, user.password)
                    .then(result => {

                        if(result) {
                            res.send({
                                user: user,
                                token: jwtSigne(user.toJSON())
                            })
                        }else {
                            res.status(404).send({
                                message: 'Your password is incorrect'
                            })
                        }

                    })

            }else {
                res.status(404).send({
                    message: 'No user found with this email address'
                })
            }
            
        })
    }
}