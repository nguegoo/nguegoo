<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on"
           @click="initUpdate"
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
                <v-col cols="12">
                  <v-text-field label="Désignation*" required
                   v-model="elementUpdate.designation"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indique que le champs est obligatoire</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text
              @click="updateCategory"
            >
              Modifier&nbsp;
              <v-icon>mdi-pencil-circle</v-icon>
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Annueler&nbsp;
              <v-icon>mdi-canclel</v-icon>
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
          <v-card-text>Mise à jour effectué avec succès !</v-card-text>
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
  </div>
</template>

<script>
import categorieServices from '@/services/categorieServices.js'
export default {
  methods: {
    initUpdate () {
      this.$emit('init-update-category')
    },
    updateCategory () {
      categorieServices.updateCategory(this.elementUpdate)
      .then(response => {
        if (response.data[0] == 1) {
          this.dialog1 = true
          this.dialog = false
          this.$emit('category-updated')
        }
      }).catch(error => {
        console.log(error.response.data)
      })
    }
  },
  data() {
    return {
      dialog: false,
      dialog1: false
    }
  },
  props: {
    elementUpdate: Object
  },
  name: "CategoryForm"
}
</script>

<style scoped></style>
