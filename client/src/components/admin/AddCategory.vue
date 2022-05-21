<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
         <v-btn
            fab
            color="indigo"
            dark
            class="ml-2"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon class="mdi-light mdi-24px">mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ajout</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Désignation*"
                    v-model="designation"
                    required
                   ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-alert
                    border="right"
                    colored-border
                    :type="alert.type"
                    :value="alert.show"
                    elevation="2"
                  >
                    {{ alert.message }}
                  </v-alert>
                </v-col>
              </v-row>
            </v-container>
            <small>*indique que le champs est obligatoire</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="addCategorie">
              Ajouter&nbsp;
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Annueler
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import categorieServices from '@/services/categorieServices.js'
export default {
  data() {
    return {
      dialog: false,
      designation: '',
      alert: {
        type: 'success',
        show: false,
        message : ''
      }
    }
  },
  methods: {
    addCategorie () {
      if (this.designation == '') {
        this.alertBox('error', true, 'Vous devez saisir la designation du produit')
        return ; 
      }
      categorieServices.add({
        designation: this.designation
      }).then(response => {
        this.designation = ''
        console.log(response.data)
        this.alertBox('success', true, `La catégroie ${response.data.categorie.designation} a été ajoutée avec succès !`)
        this.$emit('category-added')
      }).catch(error => {
        console.log(error)
        this.alertBox('error', true, error.response.data.message)
      })
    },
    alertBox (type, show, msg) {
      this.alert.type = type
      this.alert.show = show
      this.alert.message = msg
    }
  },
  name: "AddCategory"
}
</script>

<style scoped></style>
