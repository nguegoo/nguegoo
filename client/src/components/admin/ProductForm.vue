<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on"
          @click="initUpdate()"
          >
            <v-icon class="indigo--text">
              mdi-pencil-circle
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Mise à jour</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Désignation*" required
                    v-model="product.designation"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-autocomplete
                    :items="categories"
                    item-text="designation"
                    item-value="id"
                    label="Catégorie"
                    v-model="categorieSelected"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Quantité*"
                    hint="Le nombre d'exemplaire du produit"
                    persistent-hint
                    required
                    type="number"
                    v-model="product.quantite"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Prix unitaire*"
                    required
                    type="number"
                    v-model="product.prix"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Description"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    v-model="product.description"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    chips
                    multiple
                    label="Image(s)"
                    hint="Vous pouvez ajouter au plus trois images"
                    show-size
                    counter
                    ref="files"
                    v-model="files"
                  ></v-file-input>
                </v-col>
                <v-col cols="8">
                  <v-img
                    :lazy-src="`http://localhost:8081/produits/${product.image}`"
                    :src="`http://localhost:8081/produits/${product.image}`"
                    height="50px"
                    width="60px"
                    >
                  </v-img>
                </v-col>    
                <v-col cols="8">
                  <v-alert
                    :type="alert.type"
                    :value="alert.value"
                    colored-border
                    border="left"
                    elevation="2"
                  >
                   {{ alert.text }}
                  </v-alert>
                </v-col>            
              </v-row>
            </v-container>
            <small>L'image sera mise à jour après la validation</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" dark
             @click="updateProduct"
            >
              Validez&nbsp;
              <v-icon class="mdi-light">mdi-checkbox-marked-circle</v-icon>
            </v-btn>
            <v-btn color="blue darken-1"  @click="dialog = false" dark>
              Annueler
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import produitServices from '@/services/produitServices'
export default {
  methods: {
    initUpdate () {
      this.$emit('init-update')
    },
    updateProduct () {
      let a = {}
      if(typeof this.categorieSelected == typeof a) {
        this.categorieId = this.categorieSelected.id
      }else {
        this.categorieId = this.categorieSelected
      }
      var formData = new FormData()
      formData.append('designation', this.product.designation)
      formData.append('description', this.product.description)
      formData.append('categorieId', this.categorieId)
      formData.append('quantite', this.product.quantite)
      formData.append('prix', this.product.prix)
      formData.append('id', this.product.id)
      if (this.files != null) {
        this.files.forEach(f => {
        formData.append('files', f)
        })
      }
      produitServices.update(formData)
      .then(response => {
        console.log(response.data)
        let updataState = response.data[0]
        if(updataState == 1) {
          console.log("update")
          this.alert.type = 'success'
          this.alert.text = 'Modification effectuée avec succès !'
          this.alert.value = true
          this.$emit('upated-success')
        }
      }).catch(error => {
        console.log(error.response)
        this.alert.type = 'error'
        this.alert.text = error.response.data
        this.alert.value = true
      })
    }
  },
  props: {
    product: Object,
    categories: Array,
    categorieSelected: Object
  },
  data() {
    return {
      dialog: false,
      categorieId: '',
      files: null,
      alert: {
        type: 'success',
        value: false,
        text: ''
      }
    }
  },
  name: 'ProductForm'

}

</script>

<style scoped></style>
