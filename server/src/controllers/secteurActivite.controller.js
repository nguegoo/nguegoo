const SecteurActivite = require('../models/SecteurActivite')

module.exports = {

    add(req, res) {
        const { designation } = req.body
        SecteurActivite.create({
            designation: designation
        }).then(result => {
            res.send(result)
        }).catch(error => {
            res.status(404).send(error)
        })

    },

    list(req, res) {
        SecteurActivite.findAll()
            .then(result => {
                res.send(result)
            }).catch(err => {
                res.status(500).send(err)
            })

    },

    update(req, res) {
        const idCate = req.query.id
        const designation = req.body.designation
        SecteurActivite.update({
                designation: designation
            }, {
                where: {
                    id: idCate
                }
            })
            .then(result => {
                res.send(result)
            }).catch(error => {
                res.status(404).send(error)
            })

    },

    delete(req, res) {
        let idCate = req.query.id
        SecteurActivite.destroy({
            where: {
                id: idCate
            }
        }).then(result => {
            res.send(result)
        }).catch(error => {
            res.status(404).send(error)
        })
    }
}