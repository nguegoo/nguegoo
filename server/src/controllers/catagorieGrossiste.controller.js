const CategorieGrossiste = require('../models/CategorieGrossiste')

module.exports = {

    add(req, res) {
        const { designation } = req.body

        CategorieGrossiste.create({
        
            designation: designation
        }).then(result => {
            res.send(result)
        }).catch(err => {
            res.send(err)
        })
    },

    list(req, res) {
        CategorieGrossiste.findAll()
        .then(result =>{
            res.send(result)
        }).catch(err =>{
            res.send(err)
        })

    },

    update(req, res) {
      const idCate = req.query.id  
      const designation = req.body.designation
      CategorieGrossiste.update(
          {
              designation:designation
          },
         {
            where:{
                id:idCate
            }
         }
      )
      .then(result =>{
          res.send(result)
      }).catch(err =>{
          res.send(err)
      })

    },

    delete(req, res) {
      let idCate =req.query.id
      CategorieGrossiste.destroy({
          where:{
              id:idCate
          }
      }).then(result =>{
          res.send({message:'success'})
      }).catch(err =>{
          res.send(err)
      })
    }
}