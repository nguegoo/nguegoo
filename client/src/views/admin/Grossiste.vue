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
                                                <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
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
export default {
    name: 'Grossiste',
    components: {
        Navbar
    },
    data: () => ({
        search: '',
        dialog: false,
        dialogDelete: false,
        headers: [{
                text: 'Prénom',
                align: 'start',
                sortable: false,
                value: 'prenom',
            },
            {
                text: 'nom',
                value: 'nom'
            },
            {
                text: 'Activité',
                value: 'activite'
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
        desserts: [],
        editedIndex: -1,
        editedItem: {
            prenom: '',
            nom: '',
            activite: '',
            adresse: '',
            email: '',
            telephone: ''
        },
        defaultItem: {
            prenom: '',
            nom: '',
            activite: '',
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
        this.initialize()
    },

    methods: {
        initialize() {
            this.desserts = [{
                    prenom: 'Jean Diop',
                    nom: 'Dio',
                    activite: 'Alimentation shop',
                    adresse: 'Madina',
                    email: 'diop@gmail.com',
                    telephone: '625678990'
                },
                {
                    prenom: 'Jean Diop',
                    nom: 'Dio',
                    activite: 'Alimentation shop',
                    adresse: 'Madina',
                    email: 'diop@gmail.com',
                    telephone: '625678990'
                },
                {
                    prenom: 'Jean Diop',
                    nom: 'Dio',
                    activite: 'Alimentation shop',
                    adresse: 'Madina',
                    email: 'diop@gmail.com',
                    telephone: '625678990'
                },
                {
                    prenom: 'Jean Diop',
                    nom: 'Dio',
                    activite: 'Alimentation shop',
                    adresse: 'Madina',
                    email: 'diop@gmail.com',
                    telephone: '625678990'
                },
                {
                    prenom: 'Jean Diop',
                    nom: 'Dio',
                    activite: 'Alimentation shop',
                    adresse: 'Madina',
                    email: 'diop@gmail.com',
                    telephone: '625678990'
                },
                {
                    prenom: 'Jean Diop',
                    nom: 'Dio',
                    activite: 'Alimentation shop',
                    adresse: 'Madina',
                    email: 'diop@gmail.com',
                    telephone: '625678990'
                },
                {
                    prenom: 'Jean Diop',
                    nom: 'Dio',
                    activite: 'Alimentation shop',
                    adresse: 'Madina',
                    email: 'diop@gmail.com',
                    telephone: '625678990'
                },
                {
                    prenom: 'Jean Diop',
                    nom: 'Dio',
                    activite: 'Alimentation shop',
                    adresse: 'Madina',
                    email: 'diop@gmail.com',
                    telephone: '625678990'
                }
                
            ]
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
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
        accountDetails(item) {
            alert('Detail of ' + item.prenom + ' ' + item.nom)
        }
    },
}
</script>
