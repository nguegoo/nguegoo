<template>
  <div>
   <Header :productInCart="productInCart"/>
   <v-main class="indigo">
      <br><br>
      <h1 class="text-center white--text mt-2" style="font-size:2.1rem;">Magasins</h1>
      <div class="d-flex justify-center">
        <h1 style="height:10px; width:150px;" class="white mb-5"></h1>
      </div>
      <v-container fluid>
          <v-toolbar dense>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-card-subtitle>Catégories</v-card-subtitle>
            <!-- <v-btn text class="text-capitalize"
              v-for="(categorie, i) in categoriesDisplayed" :key="i"
              @click="selectCategory(categorie.id)"
            >{{ categorie.designation }}</v-btn> -->
            <div class="text-center">
              <v-menu
                open-on-hover
                bottom
                offset-y
                v-for="(categorie, i) in categorieFournisseurs"
                :key="i"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="text-capitalize ml-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                   {{ categorie.designation }}
                  </v-btn>
                </template>

                
              </v-menu>
            </div>
            <v-spacer></v-spacer>
            <v-text-field
              label="nom, catégorie, prix"
              type="search"
              append-icon="mdi-search-web"
            >
            </v-text-field>
          </v-toolbar>
      </v-container>
    </v-main>
    
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="3"
          sm="6"
          lg="3"
          v-for="(f, i) in forunisseurs"
          :key="i"
        >
          <v-card
          class="black--text white mt-2"
          transition="fab-transition"
          v-for="(f, i) in forunisseurs"
          :key="i"
          style="cursor: pointer"
          @click="allerMagasin(f.denomination)"
        >
          <v-img
            :src="`http://localhost:8080/images/${f.logo}`"
          >
          </v-img>
          <div class="grey lighten-2">
            <h3 v-text="f.denomination" class="text-center"></h3>
            <v-card-text class="black--text text-center">
              {{ f.activite }}
            </v-card-text>
            <div class="pa-6">
              <span><v-icon>mdi-card-account-phone</v-icon> {{ f.tel }}</span>
              <span><v-icon>mdi-email</v-icon> {{ f.email }}</span>
              <span><v-icon>mdi-google-maps</v-icon> {{ f.adresse }}</span>
            </div>
            <v-card-actions>
              <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>&nbsp;
              <v-btn icon><v-icon>mdi-facebook</v-icon></v-btn>
              <v-btn icon><v-icon>mdi-instagram</v-icon></v-btn>
              <v-btn icon><v-icon>mdi-whatsapp</v-icon></v-btn>
            </v-card-actions>
          </div>
        </v-card>
        </v-col>
         <v-col cols="12">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              :length="15"
              :total-visible="7"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
         <v-row>
          <v-col cols="12">
            <div class="d-flex justify-center">
              <v-card-title class="font-weight-thin text-center">Ajout de favoris</v-card-title>
            </div>
            <div class="d-flex justify-center">
              <v-icon class="grey--text mdi-48px">mdi-heart</v-icon>
            </div>
            <p style="font-size: 20px;">
             Vous pouvez ajouter un fournisseur à vos favoris pour le retrouver 
             directememt dans la liste de vos fournisseurs grossistes. <br>
             Ceci, vous permet de faciliter la recherche et accélérer les 
             services sur la plateforme.
            </p>
          </v-col>
          
      </v-row>
      </v-container>
      <div class="text-center ma-2">
        <v-snackbar
          v-model="snackbar"
        >
          {{ snackbarText }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
      <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">
            Information
          </v-card-title>
          <v-card-text>Pour ajouter un produit à votre pannier, vous devez d'abord
            vous connecter à votre compte.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="pink darken-1"
              text
              @click="dialog = false"
            >
              Fermer
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="goAuthPage"
            >
              Se connecter
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-row>
  </div>
</template>

<script>
import Header from '@/components/mainComponents/Header'
import categorieServices from '@/services/categorieServices'
//import arrayOffset from '@/services/plugins/arrayOffset'
import produitServices from '@/services/produitServices.js'
import pannierService from '@/services/pannierService'
export default {
  components: {
    Header
  },
 
  created() {
    if (localStorage.getItem('token') !== 'no') {
      this.productInCart = parseInt(localStorage.getItem('pannier'))
      console.log(this.productInCart)
    }else {
      this.productInCart = 0
    }
    categorieServices.list()
    .then(response => {
      this.categories = response.data.categories
      console.log(this.categories)
      let next = 0
      for(var i = 0; i < 3; i++) {
        this.categoriesDisplayed.push(this.categories[i])
        next = i
      }

      for (var j = next + 1 ; j < this.categories.length; j++) {
        this.otherCategories.push(this.categories[j])
      }
    }).catch(error => {
      console.log(error.response.data)
    })
    this.paginator(4, 0, null)
  },
  methods: {
    navigateTo (route) {
      this.$router.push({ path: route })
    },
    selectCategory (id) {
      this.page = 1
      this.paginateByCategory = true
      this.catId = id
      this.paginator(this.limit, 0, id)
    },
    allProduct () {
      this.page = 1
      this.paginator(4, 0, null)
    },
    paginator (limit, offset, categorieId) {
      produitServices.pagination({
        limit: limit,
        offset: offset,
        categoryId: categorieId
      }).then(response => {
        this.products = response.data.produits
        console.log(this.products)
      }).catch(error => {
        console.log(error)
      })
    },
    addCart (idProduct) {
      if(localStorage.getItem('token') !== 'no') {
        let user = JSON.parse(localStorage.getItem('user'))
        pannierService.addPanier({
          idProduct: idProduct,
          idUser: user.id
        }).then((result) => {
          this.snackbar = true
          this.snackbarText = result.data.message
          if(result.data.status == true) {
            this.productInCart++
          }
        }).catch((err) => {
          console.log(err.response.data)
        })
      }else {
        this.dialog = true
      }
    },
    goAuthPage() {
      this.navigateTo('/user/login')
    },
    allerMagasin(magasinId) {
      alert("alert au magasin " + magasinId);
    },
  },
  data() {
    return {
      categories: [],
      catId: 0,
      paginateByCategory: false,
      page: 1,
      limit: 4,
      offset: 3,
      categoriesDisplayed: [],
      otherCategories: [],
      selectedItem: 0,
      products: [],
      snackbar: false,
      snackbarText: '',
      dialog: false,
      productInCart: 0,
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
        }
      ],
      categorieFournisseurs: [
        {designation: 'Alimentation g'}, {designation: 'Vêtements'},
        {designation: 'fournitures scolaires'},
        {designation: 'materiel bureaux'}, {designation: 'Industriel'},
        {designation: 'matériels de contruction'}, 
        {designation: 'Matériels électriques'}
      ]
    }
  },
  name: "AllProduct"
}
</script>

<style scoped></style>

