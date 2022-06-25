<template>
<div>
    <Navbar>
        <h2 class="headline">GESTION DE</h2>
        <v-container fluid>
            <v-data-table :headers="headers" :items="partenaires"  class="elevation-1" :search="search">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>PARTENAIRES</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher..." single-line hide-details></v-text-field>

                        <v-dialog v-model="dialog" max-width="500px">
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
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.nom" label="Nom complet"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.engin" label="Engin"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.adresse" label="Adresse"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.telephone" label="Téléphone"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">
                                        Annuler
                                    </v-btn>
                                    <v-btn color="blue darken-1" text @click="save">
                                       Valider
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
                     <v-icon small  class="success--text" @click="accountDetails(item)">
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
import partenaireService from '@/services/partenaireService'

export default {
    name: 'Partenaire',
    components: {
        Navbar
    },
    data: () => ({
        search: '',
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: 'nom',
                value: 'nom'
            },
            {
                text: 'Engin',
                value: 'engin'
            },
            {
                text: 'Adresse',
                value: 'adresse'
            },
            {
                text: 'Email',
                value: 'email'
            },
            {
                text: 'Téléphone',
                value: 'telephone',
                sortable: false
            },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        partenaires: [],
        editedIndex: -1,
        editedItem: {
            nom: '',
            engin: '',
            adresse: '',
            email: '',
            telephone: ''
        },
        defaultItem: {
            nom: '',
            engin: '',
            adresse: '',
            email: '',
            telephone: ''
        },
        paretenaireToDelete: null,
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
        this.initialize()
    },

    methods: {
        initialize() {
            partenaireService.list()
            .then((partenaires) => {
                this.partenaires = partenaires.data
            }).catch((err) => {
                console.log(err)
            });
        },

        editItem(item) {
            this.editedIndex = this.partenaires.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.partenaires.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
            this.paretenaireToDelete = item.id
        },

        deleteItemConfirm() {
            partenaireService.delete(this.paretenaireToDelete)
            .then((result) => {
                this.initialize()
                this.closeDelete()
                console.log(result)
            }).catch((err) => {
                console.log(err)
            });
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
                partenaireService.update(this.editedItem)
                .then((partenaire) => {
                    this.initialize()
                    console.log(partenaire)
                }).catch((err) => {
                    console.log(err)
                })
               
            } else {
                partenaireService.add(this.editedItem)
                .then((partenaire) => {
                   console.log(partenaire)
                   this.partenaires.push(partenaire.data)
                }).catch((err) => {
                    console.log(err)
                });
              
            }
            this.close()
        },
        accountDetails(item) {
            alert('Detail of ' + item.prenom + ' ' + item.nom)
        }
    },
}
</script>
