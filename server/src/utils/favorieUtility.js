const Favorie = require('../models/Favorie')

module.exports = {
    estFavorie(idUser, idGrossiste, callback) {
        Favorie.findOne({
            where: {
                UserId: idUser,
                GrossisteId: idGrossiste
            }
        }).then((result) => {
            callback(result, null)
        }).catch((err) => {
            callback(null, err)
        });
    }
}