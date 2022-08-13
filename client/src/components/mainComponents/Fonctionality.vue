<template>
  <div class="mb-7 pa-5 grey lighten-4">
    <v-container class="mb-7" dark>
      <v-row>
        <v-col cols="12">
          <h1 class="text-center mt-2 text-color">Nos offres et services</h1>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <v-card class="pa-2" elevation="15">
            <v-card-text>
            <v-icon style="font-size: 60px"
            class="text-color">mdi-rotate-orbit</v-icon>
          </v-card-text>
          <h3 class="font-weight-bold text-color">Qualité Supérieure</h3>
          <p class="text-size">
            Nous avons les produits de la dernière génération dans nos boutiques.
            <br />
            Faites le choix de la meilleure qualité pour une bonne consommation
            .
          </p>
          </v-card>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <v-card class="pa-2" elevation="15">
            <v-card-text fab>
            <v-icon style="font-size: 60px"
            class="text-color">mdi-rv-truck</v-icon>
          </v-card-text>
          <h3 class="font-weight-bold text-color">Système de livraison</h3>
          <p class="text-size">
            Avec notre système de livration, vous n'avez plus besoin
            de vous déplacer. Nous nous occuperons du transport de votre produit
            juqu'à votre addresse.
          </p>
          </v-card>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <v-card class="pa-2" elevation="15">
            <v-card-text>
            <v-icon style="font-size: 60px"
              class="text-color">mdi-card-account-details-star</v-icon
            >
          </v-card-text>
          <h3 class="font-weight-bold text-color">Réglement simplifié</h3>
          <p class="text-size">
            Nous vous offrons la possibilité de choisir votre plan de
            payment(Orange Money, Mobile Money). Et effectuez votre réglement en
            toute sécurité.
          </p>
          </v-card>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <v-card class="pa-2" elevation="15">
            <v-card-text>
            <v-icon style="font-size: 60px"
              class="text-color">mdi-account-box-multiple</v-icon
            >
          </v-card-text>
          <h3 class="font-weight-bold text-color">Espace de commandes</h3>
          <p class="text-size">
            Une fois, votre compte crée, vous disposerez d'une interface
            vous permettant d'accéder à tous vos fournisseurs,
            pour vos commandes.
          </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>

    <v-container fluid class="bg-color1 mb-6">
      <v-row>
        <v-col cols="12">
          <h1 class="text-center white--text mb-3">Découvrez nos fournisseurs</h1>
        </v-col>
      </v-row>
      <carousel
        :autoplay="true"
        :nav="false"
        :items="3"
        :responsive="{
          0: { items: 1, nav: false },
          600: { items: 2, nav: true },
          1000: { items: 3, nav: true },
        }"
      >
        <v-card
          class="black--text white ml-2"
          v-for="(f, i) in forunisseurs"
          :key="i"
          style="cursor: pointer"
          @click="allerMagasin(f.denomination)"
        >
          <v-img
            :src="`http://localhost:8080/images/${f.logo}`"
            height="200px"
          >
          </v-img>
          <div class="grey lighten-2">
            <h3 v-text="f.denomination" class="text-color text-center"></h3>
            <v-card-text class="text-center">
              {{ f.activite }}
            </v-card-text>
            <div class="pa-3">
              <span><v-icon class="text-color">mdi-card-account-phone</v-icon> {{ f.tel }}</span>
              <span><v-icon class="text-color">mdi-email</v-icon> {{ f.email }}</span>
              <br>
              <span><v-icon class="text-color">mdi-google-maps</v-icon> {{ f.adresse }}</span>
            </div>
          </div>
        </v-card>
      </carousel>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-row>
              <v-col cols="12" class="d-flex justify-center">
                <div class="text-center">
                  <v-icon class="mdi-48px text-color">mdi-food-drumstick</v-icon>
                  <v-card-title class="text-color">Autres services de vente</v-card-title>
                </div>
              </v-col>
            </v-row>
            <v-row class="d-flex justify-center pa-5">
              <v-col cols="12" md="6">
                <div class="mt-3">
                  <div class="text-center mb-3">
                    <h2 class="mb-3 text-color1">Bons</h2>
                    <v-icon class="mdi-48px text-color1 mdi-spin">mdi-account-convert</v-icon>
                  </div>
                  <p style="font-size: 20px;">
                    Avec l'accord de nos partenaires grossistes, 
                    vous avez la possibilité également d'effectuer
                    de bons de commandes, et vous pourriez procéder
                    à vos règlements selon une échéance convenue.
                  </p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="mt-3">
                <div class="text-center mb-3">
                   <h2 class="mb-3 text-color1">Livraison à la boutique</h2>
                   <v-icon class="text-color1 mdi-48px mdi-spin">mdi-warehouse</v-icon>
                </div>
                  <p style="font-size: 20px;">
                    Vous pouvez vous passer de la livraison à domicile,
                    en partant directement à l'adresse de votre grossite 
                    pour recevoir vos commandes.
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import productServices from "@/services/produitServices";
import categorieServices from "@/services/categorieServices";
export default {
  methods: {
    navigateTo(route) {
      this.$router.push({ path: route });
    },
    initCarouselItems(categoryId) {
      productServices.listWithLimitAndCategory(8, categoryId);
    },
    allerMagasin(magasinId) {
      alert("alert au magasin " + magasinId);
    },
  },
  components: {
    carousel,
  },
  name: "Fonctionality",
  data() {
    return {
      productData: [],
      allProducAndPrices: [],
      categories: [],
      selectedItem: 0,
      carouselItems: [],
      forunisseurs: [
        {
          logo: "ngegoo.jpg",
          denomination: "Papétérie Diop fr",
          activite:
            "Fourniture de bureaux, matériels informatiques et marchandises divers",
          tel: "6278909876",
          email: "diop@gmail.com",
          adresse: "Madina marché- conakry republique de guinée",
        },
        {
          logo: "ngegoo.jpg",
          denomination: "Papétérie Diop fr",
          activite:
            "Fourniture de bureaux, matériels informatiques et marchandises divers",
          tel: "6278909876",
          email: "diop@gmail.com",
          adresse: "Madina marché- conakry republique de guinée",
        },
        {
          logo: "ngegoo.jpg",
          denomination: "Papétérie Diop fr",
          activite:
            "Fourniture de bureaux, matériels informatiques et marchandises divers",
          tel: "6278909876",
          email: "diop@gmail.com",
          adresse: "Madina marché- conakry republique de guinée",
        },
        {
          logo: "ngegoo.jpg",
          denomination: "Papétérie Diop fr",
          activite:
            "Fourniture de bureaux, matériels informatiques et marchandises divers",
          tel: "6278909876",
          email: "diop@gmail.com",
          adresse: "Madina marché- conakry republique de guinée",
        },
      ],
    };
  },
  created() {
    productServices
      .listWithLimit(4)
      .then((response) => {
        this.productData = response.data.res;
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    productServices
      .listWithLimit(8)
      .then((response) => {
        this.allProducAndPrices = response.data.res;
      })
      .catch((error) => {
        console.log(error.response.data.response);
      });

    categorieServices
      .list()
      .then((response) => {
        this.categories = response.data.categories;
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  },
};
</script>

<style scoped>
.bg-black {
  background-color: rgba(0, 0, 0, 0.5) !important;
}
.text-size{
  font-size: 20px!important;
}
.text-color {
  color: #4568DC!important;
}
.text-color1 {
  color: #B06AB3!important;
}
.bg-color1{
  background: #B06AB3!important;
}
.amin-bg-color {
 background: #4568DC;  /* fallback for old browsers */
background: -webkit-linear-gradient(to top, #B06AB3, #4568DC);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to top, #B06AB3, #4568DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


}
</style>