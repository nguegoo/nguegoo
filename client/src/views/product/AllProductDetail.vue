<template>
  <div>
      <Header />
      <br><br>
      <v-main class="indigo mb-8">
      <br /><br />
      <v-row class="text-center d-flex justify-center">
         <v-icon class="mdi-light mdi-48px">mdi-head</v-icon>
      </v-row>
      <h1 class="text-center white--text" style="font-size:2rem;">Produits & Informations</h1>
      <div class="d-flex justify-center">
        <h1 style="height:10px; width:200px;" class="white"></h1>
      </div>
      <v-row class="d-flex justify-center mb-0 pa-4 mb-4">
        <v-col cols="12" md="6" class="d-block d-md-flex justify-center">
          <div style="font-size:1rem;" class="white--text">
            <p>
              Vous pouvez tout apprendre sur les produits avant de décider
              de les acheter, comme le nom, la qualité, le producteur, le vendeur, date de publication du produit.
            </p>
           
            <div class="white--text">
              <div class="text-center mt-3">
                <v-btn rounded
                  @click="navigateTo('/user/registration')"
                >S'inscrire</v-btn>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-main>
    <v-container class="mb-10">
      <v-row>
        <v-col cols="12" md="8">
          <v-card class="elevation-0 mb-6"
            v-for="(product, i) in products"
            :key="i"
          >
            <v-row>
              <v-col cols="4">
                <v-img
                  :lazy-src="`http://localhost:8081/produits/${product.image}`"
                  :src="`http://localhost:8081/produits/${product.image}`"
                >
                </v-img>
              </v-col>
              <v-col cols="7">
                <v-card-title>{{ product.designation }}</v-card-title>
                <v-card-text>
                  {{ product.description }}
                  <br>
                  <v-btn
                    color="primary"
                    outlined class="text-lowercase mt-4" x-large rounded
                    @click="navigateTo(`/product/detail-product/${product.id}`)"
                  >
                    Lire plus
                  </v-btn>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <div class="mb-7">
            <v-text-field
              label="Rechercher"
              type="search"
              append-icon="mdi-magnify"
            >
            </v-text-field>
          </div>
          <div class="mb-9">
            <v-list>
              <v-card-title>Catégories</v-card-title>
              <v-list-item link
                v-for="(cat , i) in categories"
                :key="i"
                @click="listProductByCategory(cat.id)"
              >
                <v-list-item-title class="indigo--text">{{ cat.designation }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </div>
          <v-divider></v-divider>
          <div class="">
            <v-card-title>Les produits les plus achétés</v-card-title>
            <v-card class="elevation-0 mb-6"
              v-for="(mb, i) in mostBought"
              :key="i"
            >
              <v-row>
                <v-col cols="4">
                  <v-img
                  :lazy-src="`http://localhost:8081/produits/${mb.image}`"
                  :src="`http://localhost:8081/produits/${mb.image}`"
                  >
                  </v-img>
                </v-col>
                <v-col cols="7">
                  <v-card-title>{{ mb.designation }}</v-card-title>
                  <v-card-text>
                    {{ mb.description.substring(0, 30) + '...' }}
                    <br>
                    <v-btn
                      color="primary"
                    outlined class="text-lowercase mt-4" small rounded
                    @click="navigateTo(`/product/detail-product/${mb.id}`)"
                    >
                      Lire plus
                    </v-btn>
                  </v-card-text>
                </v-col>
              </v-row>
          </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/mainComponents/Header'
import Footer from '@/components/mainComponents/Footer'
import produitServices from '@/services/produitServices'
import categorieServices from '@/services/categorieServices'
export default {
  created() {
    this.allProducts()
    this.allCategories()
  },
  data () {
    return {
      products: [],
      mostBought: [],
      categories: []
    }
  },
  methods: {
    allProducts () {
      produitServices.list()
      .then((result) => {
        this.products = result.data.produits
        if (this.products.length == 1) {
          this.mostBought = this.products
        }else if (this.products.length  > 1 ) {
          for(let i = 0; i < this.products.length - 1;  i++ ) {
            this.mostBought.push(this.products[i])
          }
        }
      }).catch((err) => {
        console.log(err.response.data)
      });
    },
    allCategories () {
      categorieServices.list()
      .then((result) => {
        this.categories = result.data.categories
      }).catch((err) => {
        console.log(err.response.data)
      });
    },
    listProductByCategory (id) {
      produitServices.productByCategory({
        categoryId: id,
        limit: 30,
        offset: 0
      }).then((result) => {
        this.products = result.data.products
      }).catch((err) => {
        console.log(err.response.data)
      })
    },
    navigateTo (route) {
      this.$router.push({ path: route })
    }
  },
  name: 'AllProductDetail',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>

</style>