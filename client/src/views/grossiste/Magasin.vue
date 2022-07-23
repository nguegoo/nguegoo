<template>
<NavbarComponent v-on:init-setting-grossiste="getGrossiste"
    v-on:init-setting-categorie="getCategorie"
>
    <v-container fluid>
        <div class="row">
            <v-col cols="12" md="4" lg="3" v-for="(produit, index) in produits" :key="index">
                <v-card class="mx-auto" max-width="400">
                    <v-img class="white--text align-end" height="200px" :src="`http://192.168.43.246:8081/produits/${produit.image}`" :lazy-src="`http://192.168.43.253:8081/produits/${produit.image}`">
                    </v-img>
                    <v-card-subtitle class="pb-0">
                        {{ produit.designation }}
                    </v-card-subtitle>
                    <v-card-text class="text--primary">
                        <div>Quantite disponible: <span>{{produit.quantite}}</span></div>
                        <div><strong>Prix</strong>: <span>{{produit.pvu}} GNF</span></div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="orange" text @click="commander(produit)">
                            <v-icon>mdi-cart</v-icon>
                            Commander
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </div>
        <div class="text-center">
            <v-dialog v-model="dialog" width="500" persistent>

                <v-card class="elevation-5">
                    <div class="d-flex justify-space-between pa-2">
                        <h3 class="primary--text">Paramètres de commande</h3>
                        <v-icon class="mdi-24px">mdi-cart-variant</v-icon>
                    </div>
                    <v-divider></v-divider>
                    <div class="pa-3">
                        <div class="mb-1">
                            <strong>{{ commande.designation }}</strong>&nbsp;&nbsp;
                        </div>
                        <div class="mb-1">
                            <strong>Quantite disponible: &nbsp;&nbsp;{{ commande.quantite }}</strong>&nbsp;&nbsp;
                        </div>
                        <div class="mb-1">
                            <strong>Prix unitaire: &nbsp;&nbsp;{{ commande.prix }} GNF</strong>&nbsp;&nbsp;
                        </div>
                        <div class="mb-1">
                            <p>Prix total: &nbsp;&nbsp;<span>{{ commande.pt }} GNF</span></p>
                        </div>
                        <v-text-field label="Quelle quantite voulez - vous ?" v-model="quantite" type="number">

                        </v-text-field>
                    </div>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="validerCommande">
                            Valider
                        </v-btn>
                        <v-btn color="pink" text @click="dialog = false">
                            Annuler
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </v-container>
</NavbarComponent>
</template>

<script>
import grossisteService from "@/services/grossisteService"
import NavbarComponent from '@/components/user/NavbarComponent'
import pannierService from '@/services/pannierService'
export default {
    name: "Magasin",
    components: {
        NavbarComponent
    },
    watch: {
        quantite(value) {
           
            if(isNaN(value)) {
               this.commande.pt = 0
            }else {
                if(value == '') {
                    this.commande.pt = 0
                }else {
                    this.commande.pt += parseInt(value) * this.commande.prix
                }
               
            }

        }
    },
    data() {
        return {
            dialog: false,
            quantite: 1,
            items: [{
                    text: "Dashboard",
                    icon: "mdi-clipboard-list",
                    link: "/admin/dashboard"
                },
                {
                    text: "Grossistes",
                    icon: "mdi-clipboard-list",
                    link: "/admin/grossiste"
                },
                {
                    text: "Commandes",
                    icon: "mdi-clipboard-list",
                    link: "/admin/commande"
                },
                {
                    text: "Partenaires",
                    icon: "mdi-clipboard-list",
                    link: "/admin/partenaire"
                },
                {
                    text: "Rapport",
                    icon: "mdi-clipboard-list",
                    link: "/admin/historique"
                },
                {
                    text: "Paramètres",
                    icon: "mdi-clipboard-list",
                    link: "/admin/parametre"
                }
            ],
            produits: [],
            grossistes: [{}],
            defaultGrossiste: null,
            categorieSelected: null,
            grossisteSelected: null,
            commande: {
                produitId: null,
                designation: '',
                quantite: 0,
                prix: 0,
                pt: 0
            }
        };
    },
    methods: {
        getGrossiste(grossiste) {
            this.grossisteSelected = grossiste.id
            grossisteService.listeProduitByGrossiste(this.grossisteSelected)
                .then((res) => {
                    this.produits = res.data
                }).catch((err) => {
                    console.log(err)
                });

        },
        getCategorie(categorie) {
            this.categorieSelected = categorie.id
            grossisteService.listeProduitParGrossisteDuneCategorie(this.grossisteSelected, this.categorieSelected)
            .then((produits) => {
                this.produits = produits.data
            }).catch((err) => {
                console.log(err)
            });
        },
        initialize() {
            grossisteService
                .listGrossiste()
                .then(grossistes => {
                    this.grossistes = grossistes.data;
                    this.defaultGrossiste = this.grossistes[0]
                    this.grossisteSelected = this.defaultGrossiste.id
                    console.log(this.defaultGrossiste)
                    grossisteService.listeProduitByGrossiste(this.defaultGrossiste.id)
                        .then((res) => {
                            this.produits = res.data
                        }).catch((err) => {
                            console.log(err)
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        commander(produit) {
            this.commande.produitId = produit.id
            this.commande.designation = produit.designation
            this.commande.quantite = produit.quantite
            this.commande.prix = produit.pvu
            this.commande.pt = this.quantite * this.commande.prix
            this.dialog = true
        },
        validerCommande() {
            const token = localStorage.getItem('token')
            pannierService.addPanier(token, {
                ProduitId: this.commande.produitId,
                quantite: this.quantite
            }).then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err)
            });

        }
    },
    created() {
        this.initialize();
    }
};
</script>
