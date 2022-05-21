<template>
  <v-main>
      <Header />
      <br><br>
      <v-system-bar color="indigo" class="white--text text-center">
         <h4
          class="font-weight-thin white--text d-none d-md-block"
        >Plateforme de commande en ligne des produits </h4>
        <v-spacer class="d-none d-md-block"></v-spacer>
         <v-card-subtitle>Rapidité</v-card-subtitle>
         <v-card-subtitle>Efficacité</v-card-subtitle>
         <v-card-subtitle>Performance</v-card-subtitle>
      </v-system-bar>
      <banner class="mb-7"/>
      <fonctionality />
      <Footer />
  </v-main>
</template>

<script>
import Header from '@/components/mainComponents/Header'
import Banner from '../components/mainComponents/Banner.vue'
import fonctionality from '../components/mainComponents/Fonctionality'
import Footer from '../components/mainComponents/Footer'
export default {
  name: 'Home',
  components: {
    Header,
    Banner,
    fonctionality,
    Footer
  }
}
</script>

<style scoped>

</style>
