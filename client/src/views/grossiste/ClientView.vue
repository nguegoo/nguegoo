<template>
<Global>
    <div>
        <v-row class="d-flex justify-space-between">
            <v-col cols="12" md="4">
                <v-card-title>Clients</v-card-title>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field label="Rechercher" v-model="search" placeholder="Rechercher ici"></v-text-field>
            </v-col>
        </v-row>
    </div>
    <v-data-table :headers="client_headers" :items="clients" :search="search">
        <template v-slot:[`item.actions`]="{item}">
            <v-btn color="primary" @click="commander(item)">
                <v-icon class="white--text">mdi-cart</v-icon>
                Commander
            </v-btn>
        </template>
    </v-data-table>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Commande</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text
                        @click="initValidationf">
                            Voir la facture
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <div>
                    <v-row class="d-flex justify-space-between">
                        <v-col cols="12" md="4">
                            <v-card-title>Produits</v-card-title>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field label="Rechercher" v-model="search_produit" placeholder="Rechercher ici"></v-text-field>
                        </v-col>
                    </v-row>
                </div>
                <v-data-table :headers="produits_headers" :items="produits" :search="search_produit">
                    <template v-slot:[`item.actions`]="{item}">
                        <v-btn color="primary" @click="ajouter_produit(item)">
                            <v-icon class="white--text">mdi-plus</v-icon>
                            Ajouter
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-dialog>
    </v-row>
    <!-- Dialog edit Quantite -->
    <v-row justify="center">
        <v-dialog v-model="dialog_quantite" persistent max-width="290">
            <v-card class="pa-4">
                <v-card-title class="text-h5">
                    Edition de quantité
                </v-card-title>
                <div>
                    <v-text-field type="number" label="Quantite" placeholder="Quantité commandée" v-model="quantite_commande"></v-text-field>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="valider_ajout">
                        Valider
                    </v-btn>
                    <v-btn color="primary" text @click="dialog_quantite = false">
                        Annuler
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
    <!-- validation finale de la commande -->
    <v-row justify="center">
        <v-dialog v-model="dialog_validationf" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog_validationf = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Bilan de la commande</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="dialog_validationf = false">
                            Annuler
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <div>
                    <v-row class="d-flex justify-space-between">
                        <v-col cols="12" md="4">
                            <v-card-title>Facture</v-card-title>
                        </v-col>
                    </v-row>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        Produit
                                    </th>
                                    <th class="text-left">
                                        quantite
                                    </th>
                                    <th class="text-left">
                                        Prix
                                    </th>
                                    <th class="text-left">
                                        Montant
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(cmd, index) in commande" :key="index">
                                    <td>{{ cmd.item.designation }}</td>
                                    <td>{{ cmd.item.quantite }}</td>
                                    <td>{{ cmd.item.prix }}</td>
                                    <td>{{ cmd.item.prix * cmd.item.quantite }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                    <div class="validation-btn mt-3 pa-3">
                      <h3>Montant total: {{ totalCommande.toLocaleString('fr-FR') }} GNF</h3>
                      <v-btn color="primary"
                      @click="validationFinale">Valider</v-btn>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</Global>
</template>

<script>
import Global from "@/components/admin/Global";
import grossisteService from "@/services/grossisteService"
import {
    mapGetters
} from "vuex"
export default {
    components: {
        Global
    },
    name: 'ClientView',
    data() {
        return {
            search: null,
            search_produit: null,
            dialog: false,
            dialog_validationf: false,
            dialog_quantite: false,
            notifications: false,
            sound: true,
            widgets: false,
            currentClient: null,
            currentProduct: null,
            currentPrice: null,
            currentItem: null,
            quantite_commande: 1,
            editedItem: {
                userId: null,
                produitId: null,
                quantite: 1,
                prixProduitId: null,
                item: null,
            },
            commande: [],
            totalCommande: 0,
            client_headers: [{
                    text: 'Actions',
                    value: 'actions'
                },
                {
                    text: 'Nom',
                    value: 'User.nom'
                },
                {
                    text: 'Téléphone',
                    value: 'User.telephone'
                },
                {
                    text: 'Adresse',
                    value: 'User.adresse'
                },
                {
                    text: 'Email',
                    value: 'User.email'
                }
            ],
            produits_headers: [{
                    text: 'Actions',
                    value: 'actions'
                },
                {
                    text: 'Designation',
                    value: 'designation'
                },
                {
                    text: 'Quantité',
                    value: 'quantite'
                },
                {
                    text: 'Prix',
                    value: 'prix'
                }
            ],
            produits: [],
            clients: []
        }
    },

    created() {
        this.initialize()
    },

    methods: {
        ...mapGetters(['getUser', 'getToken']),
        initialize() {
            const token = localStorage.getItem('token')
            if (token != null) {
                grossisteService.listeClients(token)
                    .then((res) => {
                        this.clients = res.data
                    }).catch((err) => {
                        console.log(err)
                    })
                if (this.getUser() != null) {
                    grossisteService.listeProduitByGrossiste(this.getUser().grossisteId)
                        .then((res) => {
                            let prod = res.data
                            for (let i = 0; i < prod.length; i++) {
                                this.produits.push({
                                    id: prod[i].id,
                                    designation: prod[i].designation,
                                    quantite: prod[i].quantite,
                                    prix: prod[i].PrixProduits[prod[i].PrixProduits.length - 1].prix,
                                    prixId: prod[i].PrixProduits[prod[i].PrixProduits.length - 1].id
                                })
                            }
                        }).catch((err) => {
                            console.log(err)
                        });
                }
            }
        },
        commander(item) {
            this.dialog = true
            this.currentClient = item.UserId
        },
        ajouter_produit(item) {
            this.dialog_quantite = true
            this.currentProduct = item.id
            this.currentPrice = item.prixId
            this.currentItem = item
        },
        valider_ajout() {
            this.commande.push({
              userId: this.currentClient,
              produitId: this.currentProduct,
              quantite: this.quantite_commande,
              prixProduitId: this.currentPrice,
              item: this.currentItem
            })
            console.log(this.commande)
        },
        initValidationf() {
          this.commande.forEach(cmd => {
            this.totalCommande += (cmd.item.prix * cmd.item.quantite)
          });
          this.dialog_validationf = true
          this.dialog = false
        },
        /**
         * Validation finale de la commande locale
         */
        validationFinale() {
          if(this.getUser() != null) {
            grossisteService.ajout_commande({commande: this.commande}, this.getToken())
            .then((res) => {
              console.log(res.data)
            }).catch((err) => {
              console.log(err)
            });
          }
        }
    },
};
</script>
