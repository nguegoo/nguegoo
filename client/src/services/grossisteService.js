import Api from './Api'

export default {

    addUser(user) {
        return Api().post('/grossiste/add-user', user)
    },
    addGrossiste(grossiste) {
        return Api().post('/grossiste/add-grossiste', grossiste)
    },
    update(grossiste) {
        return Api().put('/grossiste/update', grossiste, {
            params: {
                id: grossiste.id
            }
        })
    },
    listGrossiste() {
        return Api().get('/grossiste/liste')
    },
    delete(userId) {
        return Api().delete('/grossiste/delete', {
            params: {
                id: userId
            }
        })
    },
    authentification(grossiste) {
        return Api().post('/grossiste/login', grossiste)
    },
    listeProduitByGrossiste(grossisteId) {
        return Api().get('/produit/produit-par-grossiste', {
            params: {
                id: grossisteId
            }
        })
    },
    listeCategoryByGrossiste(grossiste) {
        return Api().get('/categorie/categorie-par-grossiste', {
            params: {
                idGrossiste: grossiste
            }
        })
    },
    listeProduitParGrossisteDuneCategorie(grossisteId, categorieId) {
        return Api().get('/categorie/filtre', {
            params: {
               idGrossiste: grossisteId,
               idCategorie: categorieId
            }
        })
    },
    listeGrossisteParSecteur(secteurId) {
        return Api().get('/grossiste/grossiste-by-secteur', {
            params: {
                secteurId: secteurId
            }
        })
    },
    commandeParGrossiste(token) {
        return Api().get('/panier/liste',  {
            headers: {
                authorization: token
            }
        })
    },
    listeClients(token) {
        return Api().get('/grossiste/client-grossiste', {
            headers: {
                authorization: token
            }
        })
    },
    ajout_commande(data, token) {
        return Api().post('/panier/commande-local', data, {
            headers: {
                authorization: token
            }
        })
    }
}