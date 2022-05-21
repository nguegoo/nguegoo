<template>
  <v-main class="grey ligten-2 white--text">
    <v-row class="pa-4">
      <v-col cols="12" md="8">
        <h2>NGUEGOO</h2>
        <p style="font-size: 22px">
          NGUEGOO est une plateforme de commande de produits en ligne, qui met en
          rélation des clients et des grossistes. Le but principal est de
          permettre aux clients de s'abonner à un ensemble de fournisseurs pour
          pouvoir effectué leurs commandes et obtenir leurs produits avec notre
          système de livraison.
        </p>
        <p style="font-size: 22px">
          Avec cette plateforme, vous n'avez plus besoin de vous déplacer
          pour vos approvisionnements, ces derniers vous trouvent chez vous 
          en toute confiance et sécurité.
        </p>
      </v-col>
      <v-col cols="12" md="4">
        <v-img :src="require('../../../public/images/ngegoo.jpg')"
          style="border-radius: 10px;"
        > </v-img>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  name: "Banner",
  components: {},
};
</script>

<style scoped>
</style>