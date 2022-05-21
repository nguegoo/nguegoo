<template>
  <div>
    <!--<> -->
    <appbar></appbar>
    <br><br>
    <v-container>
      <v-card-title class="indigo--text">Administration des catégories de produits</v-card-title>
      <v-breadcrumbs :items="items"></v-breadcrumbs>

      <v-card>
        <v-card-title>
          Catégories
          <v-spacer></v-spacer>
          <div class="text-center">
            <v-dialog
                v-model="dialog"
                width="500"
                persistent
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
                    @click="initAdd"
                >
                    <v-icon dark>
                    mdi-plus
                    </v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2">
                Ajoutez une catégorie
                </v-card-title>

                <div class="pa-6">
                  <v-text-field
                    label="Désignation"
                    :rules="rules"
                    hide-details="auto"
                    v-model="designation"
                  ></v-text-field>
                  <v-file-input
                    show-size
                    counter
                    multiple
                    label="Image de la catégorie"
                    accept="image/png, image/jpeg, image/bmp"
                    v-model="images"
                    ref="images"
                    :loading="load"
                  ></v-file-input>
                  <v-alert
                    border="right"
                    colored-border
                    :type="alert.type"
                    elevation="2"
                    v-if="alert.displayAlert"
                    >
                      {{ alert.message }}
                  </v-alert>
                </div>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="add"
                >
                    Validez
                </v-btn>
                <v-btn
                    color="pink"
                    text
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
          :items="categories"
          :search="search"
        >
          <template v-slot:item.images="{ item }">
                <v-row>
                  <v-col>
                    <v-img
                      :lazy-src="`http://localhost:8081/categories/${item.images}`"
                      :src="`http://localhost:8081/categories/${item.images}`"
                      height="50px"
                      width="55px"
                    >
                    </v-img>
                  </v-col>
                </v-row>
              </template>
          <template v-slot:item.actions="{item}">
          <v-btn
              small
              color="primary"
              dark
              @click="update(item)"
            >
             Modifier
            </v-btn>
            <v-btn
              small
              color="pink"
              dark
              @click="destroy(item)"
            >
             Supprimer
            </v-btn>
          </template>
        </v-data-table>
     </v-card>
     <simple-dialog :simpleDialog="dialogUpdate"
     >
      <div class="pa-6">
          <v-text-field
            label="Désignation"
            :rules="rules"
            hide-details="auto"
            v-model="designation"
          ></v-text-field>
          <v-file-input
            show-size
            counter
            multiple
            label="Image de la catégorie"
            accept="image/png, image/jpeg, image/bmp"
            v-model="images"
            ref="images"
            :loading="load"
          ></v-file-input>
          <v-row>
            <v-col>
              <v-img
                :lazy-src="`http://localhost:8081/categories/${updateItem.images}`"
                :src="`http://localhost:8081/categories/${updateItem.images}`"
                height="50px"
                width="40px"
              >
              </v-img>
            </v-col>
          </v-row>
          <v-alert
            border="right"
            colored-border
            :type="alert.type"
            elevation="2"
            v-if="alert.displayAlert"
            >
              {{ alert.message }}
          </v-alert>
      </div>
      <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="edit"
          >
            Modifier
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialogUpdate = false"
          >
            Annuler
          </v-btn>
        </v-card-actions>
     </simple-dialog>
     <simple-dialog
       :simpleDialog="dialogDelete"
     >
      <v-card-subtitle>Voulez-vous vraiment supprimer cette catégorie ?</v-card-subtitle>
       <v-alert
            border="right"
            colored-border
            :type="alert.type"
            elevation="2"
            v-if="alert.displayAlert"
            >
              {{ alert.message }}
          </v-alert>
      <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="confirmDelete"
          >
            Supprmer
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialogDelete = false"
          >
            Annuler
          </v-btn>
        </v-card-actions>
     </simple-dialog>
    </v-container>
  </div>
</template>


<script>
import Appbar from '@/components/superadmin/Appbar'
import categorieServices from '@/services/categorieServices'
import category from '@/utils/superadmin/category'
import SimpleDialog from '@/components/utils/Dialog/SimpleDialog'
export default {
  name: 'Category',
  components: {
    Appbar,
    SimpleDialog
  },
  data() {
    return {
      dialog: false,
      dialogUpdate: false,
      dialogDelete: false,
      load: true,
      updateItem: { images: null },
      deleteItem: null,
      rules: [
        value => !!value || 'Champs obligatoire !.',
        value => (value && value.length >= 3) || 'Au moins 3 caractères',
      ],
      images: null,
      designation: '',
      items: category.breadCrumb ,
      search: '',
      headers: category.categoryTabHeader,
      categories: [],
      alert: {
        displayAlert: false,
        message: 'test',
        type: 'info'
      }
    }
  },
  methods: {
    add () {
      var formData = new FormData()
      formData.append('designation', this.designation)
      if (this.images != null) {
        this.images.forEach(f => {
          formData.append('images', f)
        })
      }else {
        formData.append('images', null)
      }
      formData.append('images', this.images)
       categorieServices.add(formData)
       .then((result) => {
          if (result.data.status) {
              setTimeout(() => {
                this.setAlertState(false, '', 'info')
                this.dialog = false
                this.designation = ''
                this.images = null
              }, 3000)
              this.categories.push(result.data.categorie)
              this.setAlertState(true, 'Ajout effecuté avec succès !', 'success')
          }
       }).catch((err) => {
           console.log(err)
           const errorInfo = err.response.data.error.message
           this.setAlertState(true, errorInfo, 'error')
       })
    },
    setAlertState (display, message, type) {
        this.alert.displayAlert = display
        this.alert.message = message
        this.alert.type = type
    },
    initAdd () {
        this.setAlertState(false, '', 'info')
    },
    categoryList () {
        categorieServices.list()
        .then((result) => {
          this.categories = result.data.categories
        }).catch((err) => {
            console.log(err)
        })
    },
    update(item) {
     this.dialogUpdate = true
     this.updateItem = item
     this.designation = item.designation
    },
    hide() {
      this.dialogUpdate = false
    },
    edit() {
      var formData = new FormData()
      formData.append('designation', this.designation)
      formData.append('id', this.updateItem.id)
      if (this.images != null) {
        this.images.forEach(f => {
          formData.append('images', f)
        })
      }else {
        formData.append('images', null)
      }
      formData.append('images', this.images)
      categorieServices.updateCategory(formData)
      .then((result) => {
        console.log(result.data[0])
        if (result.data[0] == 1) {
          setTimeout(() => {
            this.alert.displayAlert = false
            this.alert.message = ''
            this.alert.type = 'info'
            this.designation = ''
            this.images = null
            this.dialogUpdate = false
          }, 2000)
          this.alert.displayAlert = true
          this.alert.message = 'Modification effecutée avec succès'
          this.categoryList()
          this.alert.type = 'success'
        }
      }).catch((err) => {
        this.setAlertState(true, err.response.data.error, 'error')
      })
    },
    destroy (item) {
      this.dialogDelete = true
      this.deleteItem = item
    },
    confirmDelete () {
      categorieServices.deleteCategory(this.deleteItem.id)
      .then((result) => {
        setTimeout(() => {
          this.setAlertState(false, '', 'info')
          this.dialogDelete = false
        }, 2000)
        this.setAlertState(true, 'Suppression effectuée avec succès', 'success')
        let index = this.categories.findIndex(el => el.id == this.deleteItem.id)
        if (index != -1) {
          this.categories.splice(index, 1)
        }
        console.log(result.data)
      }).catch((err) => {
        this.setAlertState(true, 'Erreur de suppression', 'error')
        console.log(err.response.data)
      })
    }
  },
  created() {
    this.categoryList()
  },
  watch: {
    images() {
      this.load = false
    }
  }
}
</script>