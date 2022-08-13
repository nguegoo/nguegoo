<template>
<global :selectedItem="1">
    <v-card bordred>
        <v-toolbar>
            <v-breadcrumbs :items="items"></v-breadcrumbs>
        </v-toolbar>
        <v-card style="margin-top:-1%;">
            <v-card-title>
                Produits &nbsp;&nbsp;
                <v-divider vertical class="ml-2"></v-divider>
                <v-row justify="center">
                    <v-dialog v-model="dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn fab color="indigo" dark class="ml-2" v-bind="attrs" v-on="on">
                                <v-icon class="mdi-light mdi-24px">mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">Ajout de produits</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <form enctype="multipart/form-data">
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Désignation*" required v-model="designation"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-autocomplete :items="categories" label="Catégorie" item-text="designation" item-value="id" v-model="categorieId" @change="onChange($event)"></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-autocomplete :items="emballages" label="Type emballage" v-model="emballage"></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Quantité*" hint="Le nombre d'exemplaire du produit" persistent-hint required type="number" v-model="quantite"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Prix unitaire*" required type="number" v-model="prixUnitaire"></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-textarea label="Description" auto-grow outlined rows="1" row-height="15" v-model="description"></v-textarea>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-file-input chips multiple label="Image(s)" hint="Vous pouvez ajouter au plus trois images" show-size counter v-model="files" ref="files" accept="image/png, image/jpeg, image/bmp"></v-file-input>
                                            </v-col>
                                        </v-row>
                                    </form>
                                </v-container>
                                <v-alert :type="alert.type" colored-border :value="alert.value" border="left" elevation="2">
                                    {{ alert.text }}
                                </v-alert>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="addProduct">
                                    Ajouter&nbsp;
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="dialog = false">
                                    Annuler
                                </v-btn><br>
                                <small>*indique que le champs est obligatoire</small>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="products" :search="search">
                <template v-slot:item.image="{ item }">
                    <v-row>
                        <v-col>
                            <v-img :lazy-src="`http://localhost:8081/media/produits/${item.image}`" :src="`http://localhost:8081/media/produits/${item.image}`" height="50px" width="40px">
                            </v-img>
                        </v-col>
                    </v-row>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-btn icon @click="select(item)" style="margin-top: -40px;">
                        <v-icon class="red--text">
                            mdi-delete
                        </v-icon>
                    </v-btn>
                    <product-form style="margin-top: -50px;" v-on:init-update="initUpdate(item)" v-on:update-success="updateSuccess" :product="product" :categories="categories" :categorieSelected="categorieSelected" />
                </template>
            </v-data-table>
        </v-card>
    </v-card>
    <v-row justify="center">
        <v-dialog v-model="dialog1" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">
                    Confirmation
                </v-card-title>
                <v-card-text>Voulez - vous vraiment supprimer ce produit ?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog1 = false">
                        Annuler
                    </v-btn>
                    <v-btn color="pink" text @click="deleteProduct">
                        Confirmer
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
    <v-row justify="center">
        <v-dialog v-model="dialog2" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">
                    Notification
                </v-card-title>
                <v-card-text>Suppression effectuée avec succès !</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog2 = false">
                        Fermer
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>

</global>
</template>

<script>
import Global from "@/components/admin/Global"
import productData from "../../test/productData"
import ProductForm from '@/components/admin/ProductForm'
import categorieServices from '@/services/categorieServices.js'
import sousCategorieService from '@/services/sousCategorieService'
import produitServices from '@/services/produitServices'
import {
    mapGetters
} from 'vuex'
export default {
    watch: {
        categorieId(value) {
            console.log(value)
        }
    },
    methods: {
        ...mapGetters(['getUser', 'getToken']),
        select(element) {
            this.productToDelete = element.id
            this.dialog1 = true
            //alert(element.id);
        },
        deleteProduct() {
            //console.log(this.productToDelete)
            produitServices.deleteProduct({
                    id: this.productToDelete
                })
                .then(response => {
                    this.dialog2 = true
                    this.dialog1 = false
                    for (let i = 0; i < this.products.length; i++) {
                        if (this.products[i].id == this.productToDelete) {
                            this.products.splice(i, 1)
                            break;
                        }
                    }
                    console.log(response.data)
                }).catch(error => {
                    console.log("error")
                    console.log(error.response.data.error)
                })
        },
        initUpdate(item) {
            this.product = item
            this.categorieSelected = item.Categorie
            //console.log(item)
        },
        navigateTo(route) {
            this.$router.push({
                path: route
            });
        },
        addProduct() {
            const formData = new FormData()
            const grossiste = this.getUser()
            const token = this.getToken()
            formData.append('designation', this.designation)
            formData.append('description', this.description)
            formData.append('pvu', this.prixUnitaire)
            formData.append('quantite', this.quantite)
            formData.append('CategorieId', this.categorieId)
            formData.append('emballage', this.emballage)
            formData.append('GrossisteId', grossiste.grossisteId)
            this.files.forEach(f => {
                formData.append('files', f)
            })
            produitServices.add(this.$store.getters.getToken, formData).then(response => {
                setTimeout(() => {
                    this.designation = ''
                    this.description = ''
                    this.prixUnitaire = ''
                    this.quantite = ''
                    this.categorieId = null
                    this.alert.value = false
                    this.emballage = null
                    this.files = []
                    this.dialog = false
                }, 2500);
                this.alert.type = 'success'
                this.alert.value = true
                this.alert.text = 'Produit ajouté avec succès !'
                console.log(response.data)
                this.initialize_produit_table(token)
                this.products.append(response.data)

            }).catch(error => {
                let errorMessage = error.response.statusText
                this.alert.type = 'error'
                this.alert.value = true
                this.alert.text = errorMessage
                console.log(error.response.statusText)
            })
        },
        updateSuccess() {
            this.initialize_produit_table(this.getToken())
        },
        onChange(event) {
            let catId = event
            if (catId !== undefined && catId !== null) {
                sousCategorieService.listByCatId({
                        catId: catId
                    })
                    .then(response => {
                        console.log(response.data.subCategories)
                        this.subCategories = response.data.subCategories
                    }).catch(err => {
                        console.log(err.reponse)
                    })
            }
        },
        initialize_produit_table(token) {
            // list des produits
            produitServices.userProductsList(token)
                .then(response => {
                    this.products = response.data
                    this.products.forEach(produit => {
                        produit.PrixProduits.reverse()
                    });
                }).catch(error => {
                    console.log(error.response.data)
                })
        }
    },
    data() {
        return {
            grossiste: null,
            token: '',
            search: "",
            dialog: false,
            dialog1: false,
            dialog2: false,
            headers: productData.headers,
            products: [],
            product: {},
            productToDelete: null,
            categorieSelected: {},
            designation: '',
            categorieId: '',
            sousCategorieId: '',
            quantite: '',
            prixUnitaire: '',
            description: '',
            images: [],
            files: null,
            categories: [],
            subCategories: [],
            emballages: [
                'Sac',
                'Carton',
                'Sachet',
                'Ballon',
            ],
            emballage: null,
            alert: {
                type: 'error',
                value: false,
                text: ''
            },
            items: [{
                    text: "Dashboard",
                    disabled: false,
                    to: '/grossiste/dashboard'
                },
                {
                    text: "Produits",
                    disabled: false,
                    to: "/grossiste/product",
                },
                {
                    text: "Catégories",
                    disabled: false,
                    to: "/grossiste/category",
                },
                {
                    text: "Commandes",
                    disabled: false,
                    to: "/grossiste/commandes",
                },
            ],
            //Prix
            prix_headers: [{
                    text: 'Prix',
                    value: 'prix'
                },
                {
                    text: 'Produit',
                    value: 'idProduit'
                }
            ],
            prix: [],
            add_prix_dialog: false,
            prix_dialog: false
        }
    },
    created() {
        // Init Vuex token state by localStorage
        this.$store.dispatch('setToken', localStorage.getItem('token'))

        // list des catégories
        categorieServices.list()
            .then(response => {
                this.categories = response.data
            }).catch(error => {
                console.log(error.response.data)
            })
        this.initialize_produit_table(this.getToken())
    },
    name: "Product",
    components: {
        Global,
        ProductForm
    }
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

.bg-color2 {
    background-color: #4568DC !important;
}

.admin-bg-color {
    color: white !important;
    background: #4568DC;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #B06AB3, #4568DC);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #B06AB3, #4568DC);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
