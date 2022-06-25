<template>
<div>
    <Navbar>
        <h2 class="headline">GROSSISTES</h2>
        <v-container fluid>
            <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1" :search="search">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>GESTION</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher..." single-line hide-details></v-text-field>

                        <v-dialog v-model="dialog" max-width="800px" persistent>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                    Ajout
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                    </v-container>
                                    <v-contontainer>
                                        <v-stepper v-model="e6" vertical>
                                            <v-stepper-step :complete="e6 > 1" step="1">
                                                Informations personnelles
                                            </v-stepper-step>

                                            <v-stepper-content step="1">
                                                <v-card class="mb-12">
                                                    <v-row>
                                                        <v-col cols="12" sm="6" md="6">
                                                            <v-text-field v-model="editedItem.prenom" label="Prénom"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="6">
                                                            <v-text-field v-model="editedItem.nom" label="Nom"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="6">
                                                            <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="6">
                                                            <v-text-field v-model="editedItem.telephone" label="Téléphone"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <v-text-field v-model="editedItem.adresse" label="Adresse"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12">
                                                             <v-autocomplete
                                                                :items="roles"
                                                                item-text="role"
                                                                item-value="id"
                                                                label="Role"
                                                                v-model="roleSelected"
                                                        ></v-autocomplete>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <v-alert type="success" v-if="successAlert">Compte utilisateur crée avec success</v-alert>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <v-alert type="error" v-if="errorAlert">Erreur de création de compte !</v-alert>
                                                        </v-col>
                                                    </v-row>
                                                </v-card>
                                                <v-btn color="primary" @click="addUser">
                                                    Continuer
                                                </v-btn>
                                            </v-stepper-content>

                                            <v-stepper-step :complete="e6 > 2" step="2">
                                                Pramètres d'entreprise
                                            </v-stepper-step>

                                            <v-stepper-content step="2">
                                                <v-card class="mb-12">
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-text-field v-model="activite.entreprise" label="Nom Entreprise"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <v-textarea counter label="Description" :rules="rules" v-model="activite.description"></v-textarea>
                                                        </v-col>
                                                         <v-autocomplete
                                                            :items="categories"
                                                            item-text="designation"
                                                            item-value="id"
                                                            label="Catégorie de fournisseur"
                                                            v-model="activite.idCategorie"
                                                        ></v-autocomplete>
                                                        <v-col cols="12">
                                                            <v-alert type="success" v-if="grossisteSuccessAlert">Paramètres d'entreprise enrégistré avec succès !</v-alert>
                                                        </v-col>
                                                        <v-col cols="12">
                                                            <v-alert type="error" v-if="grossisteErrorAlert"> Erreur de création de paramètres d'entreprise !</v-alert>
                                                        </v-col>
                                                    </v-row>
                                                </v-card>
                                                <v-btn color="primary" @click="addGrossiste">
                                                    Valider
                                                </v-btn>
                                                <v-btn text @click="e6 = 1">
                                                    Retour
                                                </v-btn>
                                            </v-stepper-content>
                                        </v-stepper>
                                    </v-contontainer>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="dialog = !dialog">
                                        Terminer
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5">Confirmer la suppression</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">Oui</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2 primary--text" @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item)" class="pink--text mr-2">
                        mdi-delete
                    </v-icon>
                    <v-icon small class="success--text" @click="accountDetails(item)">
                        mdi-account-details
                    </v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">
                        Reset
                    </v-btn>
                </template>
            </v-data-table>
        </v-container>
    </Navbar>
</div>
</template>

<script>
import Navbar from '@/components/global/Navbar'
import grossisteService from '@/services/grossisteService'
import roleService from '@/services/roleService'
import categorieGrossisteService from '@/services/categorieGrossisteService'
export default {
    name: 'Grossiste',
    components: {
        Navbar
    },
    data: () => ({
        e6: 1,
        search: '',
        rules: [v => v.length <= 200 || 'Nombre maximal de caractères(200)'],
        value: '',
        dialog: false,
        dialogDelete: false,
        successAlert: false,
        errorAlert: false,
        grossisteSuccessAlert: false,
        grossisteErrorAlert: false,
        categories: [],
        roles: [],
        roleSelected: '',
        categorieSelected: '',
        logo: '',
        headers: [{
                text: 'Prénom',
                align: 'start',
                sortable: false,
                value: 'User.prenom',
            },
            {
                text: 'nom',
                value: 'User.nom'
            },
            {
                text: 'Activité',
                value: 'entreprise'
            },
            {
                text: 'Adresse',
                value: 'User.adresse'
            },
            {
                text: 'Email',
                value: 'User.email'
            },
            {
                text: 'Téléphone',
                value: 'User.telephone',
                sortable: false
            },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false
            },
        ],
        desserts: [],
        editedIndex: -1,
        activite: {
            entreprise: '',
            description: '',
            idCategorie: '',
            idUser: '',
        },
        editedItem: {
            prenom: '',
            nom: '',
            adresse: '',
            email: '',
            telephone: ''
        },
        defaultItem: {
            prenom: '',
            nom: '',
            adresse: '',
            email: '',
            telephone: ''
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Ajout' : 'Modification'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initializeRoleComponent()
        this.initialize()
        this.intializeCategorieComponent()
    },

    methods: {
        initializeRoleComponent() {
            roleService.list()
            .then((result) => {
                this.roles = result.data
            }).catch((err) => {
                alert('Error lors de la récupération des roles')
                console.log(err)
            });
        },
        intializeCategorieComponent(){
            categorieGrossisteService.list()
            .then((result) => {
                this.categories = result.data
            }).catch((err) => {
                alert('Erreur lors de la recupération des categories de fournisseurs')
                console.log(err)
            })
        },
        initialize() {
            grossisteService.listGrossiste()
            .then((grossistes) => {
                console.log(grossistes)
                this.desserts = grossistes.data
            }).catch((err) => {
                console.log(err)
            })
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
               console.log('test')
            }
            this.close()
        },
        addGrossiste() {
           grossisteService.addGrossiste(this.activite)
           .then((result) => {
               setTimeout(() => {
                   this.grossisteSuccessAlert = false
                   this.dialog = false
               }, 3000)
               this.grossisteSuccessAlert = true
               this.grossisteErrorAlert = false
               console.log(result.data)
               this.initialize()
           }).catch((err) => {
               console.log(err)
               this.grossisteErrorAlert = true
               this.grossisteSuccessAlert = false
           });
        },
        addUser() {
            this.editedItem['roleId'] = this.roleSelected
            grossisteService.addUser(this.editedItem)
            .then((result) => {
                setTimeout(() => {
                    this.successAlert = false
                    this.e6 = 2
                }, 3000)
                this.successAlert = true
                this.activite.idUser = result.data.id
            }).catch((err) => {
                console.log(err)
            })
        },
        accountDetails(item) {
            alert('Detail of ' + item.prenom + ' ' + item.nom)
        }
    },
}
</script>
