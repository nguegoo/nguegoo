<template>
  <div>
    <!--<> -->
    <appbar></appbar>
    <br><br>
    <v-container>
     <v-card-title class="indigo--text">Administration sous catégories de produits</v-card-title>
      <v-breadcrumbs :items="items"></v-breadcrumbs>

      <v-card>
        <v-card-title>
          Sous catégories
          <v-spacer></v-spacer>
          <div class="text-center">
            <v-dialog
            v-model="dialog"
            width="500"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    class="mx-2"
                    fab
                    dark
                    color="indigo"
                    v-bind="attrs"
                    v-on="on"
                    small
                >
                    <v-icon dark>
                    mdi-plus
                    </v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2">
                Ajoutez une sous-catégorie
                </v-card-title>
                <div class="pa-6">
                  <v-text-field
                    label="Désignation"
                    v-model="designation"
                    :rules="rules"
                    hide-details="auto"
                    class="mb-5"
                  ></v-text-field>
                  <v-autocomplete
                    v-model="categorySelected"
                    :items="categories"
                    item-text="designation"
                    item-value="id"
                    dense
                    filled
                    label="Selectionnez la catégorie"
                  ></v-autocomplete>
                  <v-file-input
                    chips
                    multiple
                    label="Image(s)"
                    hint="Vous pouvez ajouter au plus trois images"
                    show-size
                    counter
                    v-model="files"
                    ref="files"
                    accept="image/png, image/jpeg, image/bmp"
                  ></v-file-input>
                  <Alert 
                    :show="alert.show"
                    :message="alert.message"
                    :type="alert.type"
                  />
                </div>
                <v-alert
                  border="right"
                  colored-border
                  :type="alertDialog.type"
                  elevation="2"
                  v-if="alertDialog.show"
                  >
                    {{ alertDialog.message }}
                </v-alert>
                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    @click="addsubCategory"
                    dark
                >
                  Validez
                </v-btn>
                <v-btn
                    dark
                    color="pink"
                    @click="dialog = false"
                >
                  Annuler
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
          </div>
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
          :items="subCategories"
          :search="search"
        >
          <!-- <> -->
          <template v-slot:item.categorie="{ item }">
            {{ item.Categorie.designation }}
          </template>
          <template v-slot:item.image="{ item }">
            <v-row>
                  <v-col>
                    <v-img
                      :lazy-src="`http://localhost:8081/produits/${item.image}`"
                      :src="`http://localhost:8081/produits/${item.image}`"
                      height="50px"
                      width="40px"
                    >
                    </v-img>
                  </v-col>
                </v-row>
          </template>
          <template v-slot:item.actions=" { item }">
            <v-btn small
              color="primary"
              @click="edit(item)"
              class="mt-2"
            >
              Modifier
            </v-btn>
            <v-btn small
              color="pink"
              dark
              @click="deleteSubCategory(item)"
              class="ml-3 mt-2"
            >
             Supprimer
            </v-btn>
          </template>
        </v-data-table>
     </v-card>
      <!-- <> update form -->
      <simple-dialog
        :simpleDialog="simpleDialog"
        title="Modification"
      >
        <div class="pa-6">
          <v-text-field
            label="Désignation"
            v-model="designation"
            :rules="rules"
            hide-details="auto"
            class="mb-5"
          ></v-text-field>
          <v-autocomplete
            v-model="categorySelected"
            :items="categories"
            :ref="categorySelected"
            item-text="designation"
            item-value="id"
            dense
            filled
            label="Selectionnez la catégorie"
          ></v-autocomplete>
        </div>
        <Alert
          :show="alertDialog.show"
          :type="alertDialog.type"
          :message="alertDialog.message"
          class="ml-2 mr-2"
        >
        </Alert>
        <v-divider></v-divider>
         <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="update"
          >
            Modifier
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="simpleDialog = false"
          >
            Annuler
          </v-btn>
        </v-card-actions>
      </simple-dialog>
      <simple-dialog
        :simpleDialog="confirmDialog"
        title="Confirmation"
      >
        <br>
        <v-card-subtitle>Voulez - vous vraiment effecuter cette suppression ?</v-card-subtitle>
        <v-divider></v-divider>
         <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="pink darken-1"
            dark
            @click="destroy"
          >
           Confirmer
          </v-btn>

          <v-btn
            color="green darken-1"
            @click="confirmDialog = false"
            dark
          >
            Annuler
          </v-btn>
        </v-card-actions>
      </simple-dialog>

      <simple-dialog
        :simpleDialog="infoDialog"
        title="Info"
      >
        <br>
        <v-card-subtitle>Suppression effectuée avec succès !</v-card-subtitle>
        <v-divider></v-divider>
         <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            @click="infoDialog = false"
            dark
          >
           Ok
          </v-btn>
        </v-card-actions>
      </simple-dialog>
    </v-container>
    
  </div>
</template>


<script>
import Appbar from '@/components/superadmin/Appbar'
import Alert from '@/components/utils/Alert'
import AlertManager from '@/utils/Alert/AlertManager'
import subCategory from '@/utils/superadmin/subCategory'
import sousCategorieService from '@/services/sousCategorieService'
import categorieServices from '@/services/categorieServices'
import SimpleDialog from '@/components/utils/Dialog/SimpleDialog'
export default {
  name: 'Product',
  components: {
    Appbar,
    Alert,
    SimpleDialog
  },
  created() {
    this.listAllCategories()
    this.listAllSubCategories()
  },
  methods: {
    addsubCategory () {
      const formData = new FormData()
      formData.append('designation', this.designation)
      formData.append('categoryId', this.categorySelected)

      this.files.forEach(f => {
        formData.append('files', f)
      })

      sousCategorieService.addSubCategory(formData)
      .then((result) => {
        this.currentSubCategory = result.data
        this.listAllSubCategories()
        setTimeout(() => {
          this.setAlertState(false, '', 'info')
          this.dialog = false
          this.categorySelected = ''
          this.designation = ''
        }, 2000)
        this.setAlertState(true, 'Ajouté avec succès !', 'success')
      }).catch((err) => {
        console.log(err.response.data.error)
        AlertManager.setAlertState('error', true, err.response.data.error.original.sqlMessage)
      })
      //console.log(this.designation, this.categorySelected)
    },
    listAllSubCategories() {
      sousCategorieService.listAllSubCategories()
      .then((result) => {
        this.subCategories = result.data.subCategories
      }).catch((err) => {
        console.log(err.response.data)
      })
    },
    listAllCategories() {
      categorieServices.list()
      .then((result) => {
        this.categories = result.data.categories
      }).catch((err) => {
        console.log(err.response.data)
      })
    },
    setAlertState(show, message, type) {
      this.alertDialog.show = show
      this.alertDialog.message = message
      this.alertDialog.type = type
    },
    edit (item) {
      this.simpleDialog = true
      this.categorySelected = item.Categorie
      this.designation = item.designation
      this.subCategoryId = item.id
    },
    update () {
      let object = {}
      let data = {
        designation: this.designation,
        categorie: null,
        id: this.subCategoryId
      }
      if(typeof this.categorySelected == typeof object ) {
        data.categorie = this.categorySelected.id
      }else {
        data.categorie = this.categorySelected
      }
      sousCategorieService.updateSubCategory(data)
      .then((result) => {
        if (result.data.response[0] == 1) {
          setTimeout( () => {
            this.setAlertState(false, '', 'info')
            this.designation = '',
            this.categorySelected = {}
            this.simpleDialog = false
          }, 2000)
          this.setAlertState(true, 'Modification effecutée avec succès !', 'success')
          this.listAllCategories()
          this.listAllSubCategories()
        }
      }).catch((err) => {
        console.log(err.response.data)
      })
    },
    deleteSubCategory (item) {
      this.subCategoryId = item.id
      this.confirmDialog = true
    },
    destroy () {
      sousCategorieService.deleteSubCategory({
        id: this.subCategoryId
      }).then((result) => {
        console.log(result.data)
        if (result.data.response == 1) {
          this.listAllSubCategories()
          this.confirmDialog = false
          this.infoDialog = true
        }
      }).catch((err) => {
        console.log(err.response.data)
      })
    }
  },
  data() {
    return {
      categorySelected: '',
      designation: '',
      files: null,
      dialog: false,
      notValid: true,
      value: '',
      currentSubCategory: null,
      simpleDialog: false,
      confirmDialog: false,
      infoDialog: false,
      rules: [
        value => !!value || 'Champs obligatoire !.',
        value => (value && value.length >= 3) || 'Au moins 3 caractères',
      ],
      items: subCategory.breadCrumbItem,
      search: '',
      headers: subCategory.subCategoryHeader,
      subCategories: [],
      categories: [],
      alert: AlertManager.alertData,
      alertDialog: {
        show: false,
        type: 'info',
        message: 'test message'
      },
      subCategoryId: null
    }
  }
}
</script>