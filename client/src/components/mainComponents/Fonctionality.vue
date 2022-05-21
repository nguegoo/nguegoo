<template>
  <div class="mb-7">
    <v-container class="mb-7">
      <v-row>
        <v-col cols="12">
          <h2 class="text-center mt-2">Nos offres et services</h2>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <v-card-text fab>
            <v-icon style="font-size: 60px">mdi-rotate-orbit</v-icon>
          </v-card-text>
          <h4>Qualité Supérieure</h4>
          <p class="text-size">
            Nous avons les produits de la dernière génération dans nos boutiques.
            <br />
            Faites le choix de la meilleure qualité pour une bonne consommation
            et utilisation.
          </p>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <v-card-text fab>
            <v-icon style="font-size: 60px">mdi-rv-truck</v-icon>
          </v-card-text>
          <h4>Système de livraison</h4>
          <p class="text-size">
            Avec notre système de livration à domicile, vous n'avez plus besoin
            de vous déplacer. Nous nous occuperons du transport de votre produit
            juqu'à votre addresse.
          </p>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <v-card-text fab>
            <v-icon style="font-size: 60px"
              >mdi-card-account-details-star</v-icon
            >
          </v-card-text>
          <h4>Réglement simplifié</h4>
          <p class="text-size">
            Nous vous offrons la possibilité de choisir votre plan de
            payment(Orange Money, Mobile Money). Et effectuez votre réglement en
            toute facilité et sécurité.
          </p>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <v-card-text fab>
            <v-icon style="font-size: 60px"
              >mdi-account-box-multiple</v-icon
            >
          </v-card-text>
          <h4>Espace de commandes</h4>
          <p class="text-size">
            Une fois, votre compte crée, vous disposerez d'une interface
            vous permettant d'accéder à tous vos fournisseurs, pour effectuer
            des commandes et d'autres services.
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>

    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="text-center">Découvrez nos fournisseurs</h2>
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
            :src="`http://localhost:8080/images/flogo/${f.logo}`"
            height="390px"
          >
          </v-img>
          <div class="grey lighten-2">
            <h3 v-text="f.denomination" class="text-center"></h3>
            <v-card-text class="black--text text-center">
              {{ f.activite }}
            </v-card-text>
            <div class="pa-2">
              <span><v-icon>mdi-card-account-phone</v-icon> {{ f.tel }}</span>
              <span><v-icon>mdi-email</v-icon> {{ f.email }}</span>
              <span><v-icon>mdi-google-maps</v-icon> {{ f.adresse }}</span>
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
                  <v-icon class="mdi-48px">mdi-food-drumstick</v-icon>
                  <v-card-title>Autres services de vente</v-card-title>
                </div>
              </v-col>
            </v-row>
            <v-row class="d-flex justify-center pa-5">
              <v-col cols="12" md="6">
                <div class="mt-3">
                  <h3 class="text-center">Bons</h3>
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
                <h3 class="text-center">Livraison à la boutique</h3>
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
          logo: "product-7.jpg",
          denomination: "Papétérie Diop fr",
          activite:
            "Fourniture de bureaux, matériels informatiques et marchandises divers",
          tel: "6278909876",
          email: "diop@gmail.com",
          adresse: "Madina marché- conakry republique de guinée",
        },
        {
          logo: "product-7.jpg",
          denomination: "Papétérie Diop fr",
          activite:
            "Fourniture de bureaux, matériels informatiques et marchandises divers",
          tel: "6278909876",
          email: "diop@gmail.com",
          adresse: "Madina marché- conakry republique de guinée",
        },
        {
          logo: "product-7.jpg",
          denomination: "Papétérie Diop fr",
          activite:
            "Fourniture de bureaux, matériels informatiques et marchandises divers",
          tel: "6278909876",
          email: "diop@gmail.com",
          adresse: "Madina marché- conakry republique de guinée",
        },
        {
          logo: "product-7.jpg",
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
</style>