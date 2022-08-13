<template>
<div>
    <Header :productInCart="productInCart" />
    <v-main class="amin-bg-color">
        <br><br>
        <h1 class="text-center white--text mt-6" style="font-size:2.1rem;">Tous nos fournisseurs</h1>
        <div class="d-flex justify-center mb-6">
            <v-icon class="mdi-48px mdi-light">mdi-account-group</v-icon>
        </div>
        <v-container fluid>
            <v-toolbar dense>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-card-subtitle>Catégories</v-card-subtitle>
                <!-- <v-btn text class="text-capitalize"
              v-for="(categorie, i) in categoriesDisplayed" :key="i"
              @click="selectCategory(categorie.id)"
            >{{ categorie.designation }}</v-btn> -->

                <v-col cols="12" sm="6" class="py-2">
                    <v-btn-toggle v-model="toggle_exclusive" color="primary">
                        <v-btn v-for="(categorie, index) in defaultCategories" :key="index" @click="grossisteParSecteur(categorie.id)">
                            {{ categorie.designation }}
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
                <v-btn icon @click="secteurActivitePagination">
                    <v-icon class="indigo white--text mdi-24px">mdi-plus</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-text-field label="nom, catégorie, prix" type="search" append-icon="mdi-search-web">
                </v-text-field>
            </v-toolbar>
        </v-container>
    </v-main>
    <div class="grey lighten-4">

        <v-container>
            <v-row>
                <v-col cols="12" md="3" sm="6" lg="3" v-for="(f, i) in fournisseurs" :key="i">
                    <v-card class="black--text white mt-2" transition="fab-transition">
                        <v-img :src="`http://localhost:8080/images/${f.logo}`">
                        </v-img>
                        <div class="grey lighten-2">
                            <h3 v-text="f.denomination" class="text-center"></h3>
                            <v-card-text class="black--text text-center">
                                {{ f.entreprise }}
                            </v-card-text>
                            <div class="pa-6">
                                <span>
                                    <v-icon class="indigo--text">mdi-card-account-phone</v-icon> {{ f.User.telephone }}
                                </span>
                                <span>
                                    <v-icon class="indigo--text">mdi-email</v-icon> {{ f.User.email }}
                                </span>
                                <span>
                                    <v-icon class="indigo--text">mdi-google-maps</v-icon> {{ f.User.adresse }}
                                </span>
                            </div>
                            <v-card-actions>
                                <v-btn icon @click="addFavori(f.id)">
                                    <v-icon>mdi-heart</v-icon>
                                </v-btn>&nbsp;

                                <v-btn icon>
                                    <v-icon class="indigo--text">mdi-whatsapp</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-container class="max-width">
                        <v-pagination v-model="page" class="my-4" :length="15" :total-visible="7"></v-pagination>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <div class="d-flex justify-center">
                        <v-card-title class="font-weight-thin text-center">Ajout de favoris</v-card-title>
                    </div>
                    <div class="d-flex justify-center">
                        <v-icon class="text-color1 mdi-48px">mdi-heart</v-icon>
                    </div>
                    <p style="font-size: 20px;">
                        Vous pouvez ajouter un fournisseur à vos favoris pour le retrouver
                        directememt dans la liste de vos fournisseurs grossistes. <br>
                        Ceci, vous permet de faciliter la recherche et accélérer les
                        services sur la plateforme.
                    </p>
                </v-col>

            </v-row>
        </v-container>
        <div class="text-center ma-2">
            <v-snackbar v-model="snackbar">
                {{ snackbarText }}

                <template v-slot:action="{ attrs }">
                    <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
                <v-card>
                    <v-card-title class="headline">
                        Information
                    </v-card-title>
                    <v-card-text>
                        {{ alertMessage }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="pink darken-1" text @click="dialog = false">
                            Fermer
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</div>
</template>

<script>
import Header from '@/components/mainComponents/Header'
//import arrayOffset from '@/services/plugins/arrayOffset'
import grossisteService from '@/services/grossisteService'
import produitServices from '@/services/produitServices.js'
import pannierService from '@/services/pannierService'
import favoriService from '@/services/favoriService'
import categorieGrossisteService from '@/services/categorieGrossisteService'
export default {
    components: {
        Header
    },

    created() {
        this.initialize()
        categorieGrossisteService.list()
            .then(response => {
                this.categories = response.data
                if (this.categories.length > 5) {
                    for (let i = 0; i < 5; i++) {
                        this.defaultCategories.push(this.categories[i])
                    }
                    this.compteurSaut = 1;

                }
            }).catch(error => {
                console.log(error.response.data)
            })
        //this.paginator(4, 0, null)
    },
    methods: {
        secteurActivitePagination() {
            if (this.categories.length - (this.nbSaut * this.compteurSaut) >= 5) {
                this.offsetCategorie(
                    this.nbSaut * this.compteurSaut,
                    this.nbSaut * (this.compteurSaut + 1)
                )
            } else {
                if (this.categories.length - (this.nbSaut * this.compteurSaut) == 1) {
                    this.defaultCategories = []
                    this.defaultCategories.push(
                        this.categories[this.nbSaut * this.compteurSaut]
                    )
                } else {
                    this.offsetCategorie(
                        this.nbSaut * this.compteurSaut,
                        this.categories.length
                    )
                }

            }
        },
        offsetCategorie(debut, fin) {
            this.defaultCategories = []
            for (let i = debut; i < fin; i++) {
                this.defaultCategories.push(this.categories[i])
            }
            this.compteurSaut++
        },
        navigateTo(route) {
            this.$router.push({
                path: route
            })
        },
        selectCategory(id) {
            this.page = 1
            this.paginateByCategory = true
            this.catId = id
            this.paginator(this.limit, 0, id)
        },
        allProduct() {
            this.page = 1
            this.paginator(4, 0, null)
        },
        paginator(limit, offset, categorieId) {
            produitServices.pagination({
                limit: limit,
                offset: offset,
                categoryId: categorieId
            }).then(response => {
                this.products = response.data.produits
                console.log(this.products)
            }).catch(error => {
                console.log(error)
            })
        },
        addCart(idProduct) {
            if (localStorage.getItem('token') !== 'no') {
                let user = JSON.parse(localStorage.getItem('user'))
                pannierService.addPanier({
                    idProduct: idProduct,
                    idUser: user.id
                }).then((result) => {
                    this.snackbar = true
                    this.snackbarText = result.data.message
                    if (result.data.status == true) {
                        this.productInCart++
                    }
                }).catch((err) => {
                    console.log(err.response.data)
                })
            } else {
                this.dialog = true
            }
        },
        goAuthPage() {
            this.navigateTo('/user/login')
        },
        allerMagasin(magasinId) {
            alert("alert au magasin " + magasinId);
        },
        initialize() {
            grossisteService.listGrossiste()
                .then((grossistes) => {
                    this.fournisseurs = grossistes.data
                    for (let i = 0; i < this.fournisseurs.length; i++) {
                        this.fournisseurs[i]['logo'] = 'ngegoo.jpg'
                    }
                }).catch((err) => {
                    console.log(err)
                })
        },
        grossisteParSecteur(secteur) {
            grossisteService.listeGrossisteParSecteur(secteur)
                .then((result) => {
                    this.fournisseurs = result.data
                    for (let i = 0; i < this.fournisseurs.length; i++) {
                        this.fournisseurs[i]['logo'] = 'ngegoo.jpg'
                    }
                }).catch((err) => {
                    console.log(err)
                });
        },
        addFavori(grossisteId) {
            const token = localStorage.getItem('token')
            if (token == null) {
                alert("Vous devez d'abord vous authentifer")
            } else {
                favoriService.add(token, {
                        GrossisteId: grossisteId
                    })
                    .then((result) => {
                        this.alertMessage = "Ajouté dans vos favoris avec succès !"
                        this.dialog = true
                        console.log(result)
                    }).catch((err) => {
                        this.alertMessage = err.response.data.message
                        console.log(this.alertMessage)
                        this.dialog = true

                    });
            }
        }
    },
    data() {
        return {
            nbSaut: 5,
            compteurSaut: 0,
            defaultCategories: [],
            categories: [],
            catId: 0,
            paginateByCategory: false,
            page: 1,
            limit: 4,
            offset: 3,
            categoriesDisplayed: [],
            otherCategories: [],
            selectedItem: 0,
            products: [],
            snackbar: false,
            snackbarText: '',
            dialog: false,
            alertMessage: '',
            productInCart: 0,
            fournisseurs: [],
            toggle_exclusive: 0
        }
    },
    name: "AllProduct"
}
</script>

<style scoped>
.text-color {
    color: #4568DC !important;
}

.text-color1 {
    color: #B06AB3 !important;
}

.bg-color1 {
    background: #B06AB3 !important;
}

.amin-bg-color {
    background: #4568DC;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #B06AB3, #4568DC);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #B06AB3, #4568DC);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>
