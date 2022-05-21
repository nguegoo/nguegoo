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
              <v-toolbar dense>
                <v-card-title>Ayeeyu</v-card-title>
                <v-card-subtitle class="mt-4">Fiche de livraison</v-card-subtitle>
                <v-spacer></v-spacer>
                <v-card-subtitle>
                  <strong>Date: </strong><span>12-02-2021</span> / <span>12:30</span>
                </v-card-subtitle>
              </v-toolbar>
            </v-col>
            <v-col cols="12">
              <v-toolbar-title>Infmations du client</v-toolbar-title>
            </v-col>
            <v-col cols="12">
              <v-avatar>
                <v-img
                  src="../../../public/images/person_2.jpg"
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
                    <strong>Adresse: </strong> <span>Guinée-Conakry-Matoto-Matoto marché</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12">
              <v-divider></v-divider>
              <v-toolbar-title>Informations du vendeur</v-toolbar-title>
            </v-col>
            <!-- Informations du vendeur -->
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
              <center>
                <v-toolbar-title class="mt-3">Commande(s)</v-toolbar-title>
              </center>
              <v-row>
                <v-col cols="12" md="4"
                  v-for="(c , i) in commandes"
                  :key="i"
                >
                  <v-card class="elevation-0">
                    <v-img
                      :src="require(`../../../public/images/${c.img}`)"
                    >
                    </v-img>
                    <v-card-text class="text-center">
                      <v-card-subtitle>{{ c.name }}</v-card-subtitle>
                      <v-card-subtitle>
                      <strong class="green--text">Quantité</strong>:&nbsp;
                      <span>{{ c.quantite }}</span>
                      </v-card-subtitle>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-toolbar dense>
                    <v-icon>mdi-apps</v-icon>
                    <v-spacer></v-spacer>
                    <v-btn class="indigo" dark>
                      <v-icon>mdi-cloud-print</v-icon>
                     <span class="ml-2">Imprimer</span>
                    </v-btn>
                  </v-toolbar>
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
import Global from '@/components/partneradmin/Global'
export default {
  data () {
    return {
      commandes: [
        { name: 'Pomme', img: 'product-10.jpg', quantite: 300 },
        { name: 'Jus', img: 'product-8.jpg', quantite: 120 },
        { name: 'Carottes', img: 'product-7.jpg', quantite: 89 }
      ]
    }
  },
  components: { Global },
  name: 'LivraisonDetail'
}
</script>

<style scoped>

</style>