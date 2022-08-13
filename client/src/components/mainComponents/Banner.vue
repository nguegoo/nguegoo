<template>
<v-main class="amin-bg-color white--text">
    <v-row class="pa-4">
        <v-col cols="12" md="6">
            <h2>NGUEGOO</h2>
            <p style="font-size: 20px">
                Est une plateforme de commande de produits en ligne, qui met en
                rélation des clients et grossistes. Le bût principal est de
                permettre aux clients de s'abonner à un ensemble de fournisseurs pour
                pouvoir effectuer leurs commandes et obtenir leurs produits en toute facilité.
            </p>
            <p style="font-size: 20px">
                Avec cette plateforme, vous n'avez plus besoin de vous déplacer
                pour vos approvisionnements, Vous pouvez utiliser notre système
                livraison pour gagner largement en temps.
            </p>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-center align-center">
            <div>
                <v-card class="text-center" elevation="15" style="height: 120px;">
                    <v-img :src="require('../../../public/images/ngegoo.jpg')" style="border-radius: 10px;"> </v-img>
                </v-card> <br>
                <div class="text-center">
                  <v-subheader class="white--text">Dévenir sur notre plate-forme un</v-subheader>
                  <v-btn class="bg-color1" rounded
                    @click="navigateTo('/user/registration')"
                  >
                    <v-icon class="mdi-light">mdi-account</v-icon>
                    client</v-btn>
                  <v-btn class="ml-1" rounded>
                    <v-icon class="text-color2">mdi-account-group</v-icon>
                    grossiste</v-btn>
                </div>
            </div>
        </v-col>
    </v-row>
</v-main>
</template>

<script>
export default {
    name: "Banner",
    components: {},
    methods: {
      navigateTo(route) {
        this.$router.push({ path: route })
      }
    },
};
</script>

<style scoped>
.amin-bg-color {
    background: #4568DC;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #B06AB3, #4568DC);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #B06AB3, #4568DC);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.bg-color1{
  background: #4568DC!important;
  color: white!important;
}
.text-color2{
  color: #B06AB3!important;
}
</style>
