const Joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            prenom:Joi.string(),
            nom: Joi.string(),
            telephone: Joi.string(),
            email:Joi.string().email(),
            mdp: Joi.string().regex(new RegExp('[a-zA-Z0-9]{5,255}$')),
            typeCompte: Joi.string(),
            pays: Joi.string(),
            ville: Joi.string(),
            quartier: Joi.string(),
            adresse: Joi.string()
        })

        const  { error , value } = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'prenom': 
                    res.status(400).send({error : `Le champs prenom est obligatoire !`})
                    break
                case 'nom': 
                    res.status(400).send({ error: `Le champs nom est obligatoire !` })
                    break
                case 'email':
                    res.status(400).send({error: `Adresse email invalide !`})
                    break
                case 'mdp':
                    res.status(400).send({
                        error: ` Le mot de passe doit comporter au moins 5 caractères
                        `
                    })
                    break
                default:
                    res.send({
                        error: value
                    })
            }

            return
        }
        next()
    }
}