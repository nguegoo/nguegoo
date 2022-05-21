/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs')

module.exports  = {
    bHash (text) {
        return new Promise(function(resolve, reject) {
            bcrypt.genSalt(10, (err, salt) => {

                bcrypt.hash(text, salt, (err, hash) => {

                   if (!err) {
                        resolve(hash)
                   }else {
                        reject(new Error(err))
                   }

                })
            })
        })
    },
    bCompare (text, textHashed) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(text, textHashed)
                .then((res) => {
                    resolve(res)
                }).catch(err => {

                })
        })
    }

}