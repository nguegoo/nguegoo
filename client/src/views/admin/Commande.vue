<template>
<div>
    <Navbar>
        <h2 class="headline">GESTION DE </h2>
        <v-container fluid>
            <v-data-table :headers="headers" :items="commandes" sort-by="calories" class="elevation-1" :search="search">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>COMMANDES</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher..." single-line hide-details></v-text-field>
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
                    <v-icon small @click="deleteItem(item)" class="pink--text mr-2">
                        mdi-delete
                    </v-icon>
                    <v-icon small class="success--text" @click="accountDetails(item)">
                       mdi-view-list
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
    name: 'Commande',
    components: {
        Navbar
    },
    data: () => ({
        search: '',
        dialog: false,
        dialogDelete: false,
        headers: [{
                text: 'ID',
                align: 'start',
                sortable: false,
                value: 'id',
            },
            {
                text: 'Produit(s)',
                value: 'produit'
            },
            {
                text: 'Client',
                value: 'client'
            },
            {
                text: 'Actions',
                value: 'actions'
            }

        ],
        commandes: [],
        editedIndex: -1,
        editedItem: {
            id: '',
            produit: '',
            client: ''
        },
        defaultItem: {
            id: '',
            produit: '',
            client: ''
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
        },

        editItem(item) {
            this.editedIndex = this.commandes.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.commandes.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.commandes.splice(this.editedIndex, 1)
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
                Object.assign(this.commandes[this.editedIndex], this.editedItem)
            } else {
                this.commandes.push(this.editedItem)
            }
            this.close()
        },
        accountDetails(item) {
            alert('Detail of ' + item.prenom + ' ' + item.nom)
        }
    },
}
</script>

<style>

</style>
