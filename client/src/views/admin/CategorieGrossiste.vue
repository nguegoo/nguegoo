<template>
<div>
    <Navbar>
        <h2 class="headline">GESTION DE PARAMETRES</h2>
        <v-breadcrumbs :items="items">
            <template v-slot:item="{ item }">
                <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
                    {{ item.text.toUpperCase() }}
                </v-breadcrumbs-item>
            </template>
        </v-breadcrumbs>
        <v-container fluid>
            <v-data-table :headers="headers" :items="categories" sort-by="calories" class="elevation-1" :search="search">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>ROLES</v-toolbar-title>
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
                                            <v-col cols="12" sm="8" md="8">
                                                <v-text-field v-model="editedItem.designation" label="Nom de categorie"></v-text-field>
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
import categorieGrossisteService from '@/services/categorieGrossisteService'
export default {
    name: 'CategorieGrossiste',
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
                text: 'designation',
                value: 'designation'
            },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false
            },
        ],
        categories: [],
        editedIndex: -1,
        editedItem: {
            designation: ''
        },
        defaultItem: {
            designation: ''
        },
        items: [{
                text: 'Role',
                disabled: false,
                href: '/admin/parametre',
            },
            {
                text: 'Catégorie grossiste',
                disabled: true,
                href: '/admin/categorie-grossiste',
            }
        ],
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
            categorieGrossisteService.list()
                .then((result) => {
                    console.log(result)
                    this.categories = result.data
                }).catch((err) => {
                    console.log(err)
                })
            this.categories = []
        },

        editItem(item) {
            this.editedIndex = this.categories.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.categories.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            categorieGrossisteService.delete(this.editedItem.id)
                .then((result) => {
                    this.categories.splice(this.editedIndex, 1)
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
                categorieGrossisteService.update(this.editedItem)
                    .then((result) => {
                        Object.assign(this.categories[this.editedIndex], this.editedItem)
                        console.log(result)
                    }).catch((err) => {
                        console.log(err)
                    })
            } else {
                categorieGrossisteService.add(this.editedItem)
                    .then((result) => {
                        this.categories.push(result.data)
                        console.log(result.data)
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
