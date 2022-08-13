<template>
    <global>
            <v-breadcrumbs :items="items"></v-breadcrumbs>
          <v-card>
            <v-card-title>
              Catégories
              <v-divider vertical class="ml-2"></v-divider>
              <add-category  class="ml-2"
                v-on:category-added="callRefresh"
              />
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="categories"
              :search="search"
            >
              <template v-slot:item.actions="{ item }">
                <category-form
                  v-on:init-update-category="initUpdateCategroy(item)"
                  v-on:category-updated="updatedListener"
                  :elementUpdate="elementUpdated"
                 />
                <v-btn icon
                  @click="initDelete(item)"
                  style=""
                >
                  <v-icon class="pink--text">mdi-delete</v-icon>
                </v-btn>
              </template>
          </v-data-table>
          </v-card>
      <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">
            Confirmation
          </v-card-title>
          <v-card-text>Voulez - vous vraiment supprimer cette catégorie ?.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Annuler
            </v-btn>
            <v-btn
              color="pink"
              text
              @click="deleteCategory"
            >
              Confirmer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="dialog1"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">
            Notification
          </v-card-title>
          <v-card-text>Suppression effectuée avec succès !</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog1 = false"
            >
              Fermer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    </global>
</template>

<script>
import Global from '../../components/admin/Global.vue'
import CategoryForm from '@/components/admin/CategoryForm'
import AddCategory from '../../components/admin/AddCategory.vue'
import categorieServices from '@/services/categorieServices.js'
export default {
  methods: {
    /*
    *Initialise la suppression
    */
    initDelete (item) {
      this.categoryDeleted = item.id
      this.dialog = true
    },
    /*
    * Intialise la mise à jour
    */
    initUpdateCategroy (item) {
      this.elementUpdated = {
        id: item.id,
        designation: item.designation
      }
    },
    /* 
      Lorsque la mise à jour est validée avec succès 
    */
    updatedListener () {
      this.refreshDataTable()
    },
    /*
      Suppression d'une catégorie
    */
    deleteCategory () {
      categorieServices.deleteCategory(this.categoryDeleted)
      .then(response => {
        if (response.data.response == 1) {
          this.dialog = false
          this.dialog1 = true
          this.categoryDeleted = ''
          this.refreshDataTable()
        }
      }).catch(error => {
        console.log(error.data.response)
      })
    },
    /*
      Actualise le tableau v-data-table
    */
    refreshDataTable () {
      categorieServices.list()
      .then(response => {
        this.categories = response.data
      }).catch(error => {
        console.log(error.response.data)
      })
    },
    /*
      Appel la fonction refreshDataTable
    */
    callRefresh () {
      this.refreshDataTable()
    }
  },
  created() {
    categorieServices.list()
    .then(response => {
      this.categories = response.data
    }).catch(error => {
      console.log(error.response.data)
    })
  },
  data () {
    return {
      search: null,
      dialog: false,
      dialog1: false,
      elementUpdated: {},
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Désignation', value: 'designation' },
        { text: 'Actions', value: 'actions' }
      ],
      categoryDeleted: '',
      categories: [], 
      items: [
        {
          text: "Dashboard",
          disabled: false,
          to: "/grossiste/dashboard"
        },
        {
          text: "Produits",
          disabled: false,
          to: "/grossiste/product",
        },
        {
          text: "Catégories",
          disabled: true,
          to: "/grossiste/category",
        },
        {
          text: "Commandes",
          disabled: false,
          to: "/grossiste/commandes",
        },
      ]
    }
  },
  name: 'Category',
  components: {
    Global,
    CategoryForm,
    AddCategory
  }
}
</script>

<style scoped>

</style>