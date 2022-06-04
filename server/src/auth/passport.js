const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const hash = require('../policies/hash')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, (username, password, done) => {
            // Match user
            // console.log(username, password)
            User.findOne({
                where: {
                    email: username
                }
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: `Aucun utilisateur ne correspond à cette adresse email !` })
                }

                //Match Password
                hash.bCompare(password, user.mdp)
                    .then(result => {
                        if (result) {
                            return done(null, user)
                        }

                        return done(null, false, { message: 'Mot de passe incorrect' })
                    })
            }).catch(err => {
                console.log(err)
            })
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, user) => {
        User.findByPk(id)
            .then(user => {
                done(null, user)
            }).catch(err => {
                done(err, null)
            })
    })
}