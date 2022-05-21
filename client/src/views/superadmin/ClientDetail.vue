<template>
  <div>
    <global>
    <br><br>
      <v-row>
        <v-col cols="12" md="9" lg="10" offeset="0" offset-md="3" offset-lg="2"
        >
          <v-card class="pa-3">
          <v-row>
            <v-col cols="12">
              <v-avatar>
                <v-img
                  src="../../../public/images/person_1.jpg"
                >
                </v-img>
              </v-avatar>
            </v-col>
            <v-col cols="12" md="6">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <strong>Nom complet: </strong> <span>Moussa Camara</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <strong>Téléphone: </strong> <span>625000214</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <strong>Email: </strong> <span>moussa@gmail.com</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" md="6">
               <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <strong>Pays: </strong> <span>Guinée</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
               <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <strong>Ville: </strong> <span>Conakry</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
               <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <strong>Adresse du lieu de vente: </strong> <span>Madina</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12">
              <v-divider></v-divider>
              <v-card-title class="mb-2">Produit(s) en ligne</v-card-title>
              <v-row>
                <v-col cols="12" md="3"
                  v-for="(p , i ) in productsList"
                  :key="i"
                >
                  <v-card>
                    <v-card-subtitle>{{ p.name }}</v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          </v-card>
        </v-col>
      </v-row>
    </global>
  </div>
</template>

<script>
import Global from '../../components/superadmin/Global.vue'
export default {
  data () {
    return {
      productsList: [
        { name: 'Chaussures', img: 'img1' },
        { name: 'Vêtements', img: 'img2' },
        { name: 'Montres', img: 'img3' },
        { name: 'Sacs', img: 'img4' }
      ]
    }
  },
  components: { Global },
  name: 'ClientDetail'
}
</script>

<style scoped>

</style>