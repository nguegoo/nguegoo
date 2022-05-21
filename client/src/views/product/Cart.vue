<template>
  <div>
    <Header :productInCart="productInCart"/>
    <br><br>
    <v-main class="indigo mb-8">
      <br /><br />
      <v-row class="text-center d-flex justify-center">
        <v-badge color="green" :content="products.length" offset-y="6" offset-x="20">
          <v-icon class="mdi-light mdi-48px">mdi-cart-variant</v-icon>
        </v-badge>
      </v-row>
      <h1 class="text-center white--text" style="font-size:3rem;">Panier</h1>
      <div class="d-flex justify-center">
        <h1 style="height:10px; width:200px;" class="white"></h1>
      </div>
      <v-row class="d-flex justify-center mb-0 pa-4 mb-4">
        <v-col cols="12" md="6" class="d-flex justify-center">
          <p style="font-size:1rem;" class="white--text">
            Dans votre panier figurent tous les produits que vous avez choisi
            pour l'achat. <br />
            Renseigner la quantité de chaque produit puis choisir votre mode de
            payement.
          </p>
        </v-col>
      </v-row>
    </v-main>
    <v-container class="mb-8">
      <v-simple-table dense>
        <template v-slot:default>
          <thead class="indigo lighten-5">
            <tr>
              <th class="text-left">
                Image
              </th>
              <th class="text-left">
                Nom et description
              </th>
              <th class="text-left">
                Prix unitaire
              </th>
              <th class="text-left">
                Quantite
              </th>
              <th class="text-left">
                Total
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pannier, i) in products" :key="i">
              <td>
                <v-img
                  :src="`http://localhost:8081/produits/${pannier.Produit.image}`"
                  :lazy-src="`http://localhost:8081/produits/${pannier.Produit.image}`"
                  width="50px"
                ></v-img>
              </td>
              <td class="text-center">
                <v-card-subtitle class="font-weight-bold">
                {{ pannier.Produit.designation }}</v-card-subtitle>
              </td>
              <td class="font-weight-bold">{{ pannier.Produit.prix + " GNF" }}</td>
              <td>
                <v-text-field
                  label="Quantité"
                  type="number"
                  v-model="pannier.quantite"
                  class="text-center"
                >
                </v-text-field>
              </td>
              <td class="font-weight-bold">
                {{ pannier.quantite * pannier.Produit.prix + " GNF" }}
              </td>
              <td>
                <v-btn icon
                  @click="deleteProduct(pannier.id, i)"
                >
                  <v-icon class="pink--text">mdi-trash-can</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <v-divider></v-divider>
    <v-container class="mb-12 mt-7">
      <div class="d-flex justify-center mb-8">
        <v-hover v-slot="{ hover }">
          <v-btn
            color="indigo"
            dark
            class="text-capitalize"
            x-large
            rounded
            @click="displaySteper = !displaySteper"
            :elevation="hover ? 16 : 2"
            :class="{ 'on-hover': hover }"
            href="#stepper"
          >Réglement</v-btn>
        </v-hover>
      </div>
      <v-scroll-y-transition>
        <v-row v-if="displaySteper" id="stepper">
          <v-stepper v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1">
              <v-card-title>Informations</v-card-title>
              <small>Vérification de vos informations personnelles</small> <br>
              <small>Vérifier ou indiquer correctement votre numéro de téléphone,
              pour faciliter le payement. Mentionner une bonne adresse nous permettra
              d'effectuer une livraison rapide.
              </small>
            </v-stepper-step>

            <v-stepper-content step="1">
            <v-card class="pa-5">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="Prénom"
                    disabled
                    v-model="user.prenom"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Nom"
                  disabled
                    v-model="user.nom"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Téléphone" v-model="user.telephone"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Email" type="email"
                    disabled
                    v-model="user.email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select label="Pays" :items="pays" v-model="user.pays"></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    label="Ville"
                    :items="villes"
                    v-model="user.ville"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Adresse" v-model="user.adresse"></v-text-field>
                </v-col>
              </v-row>
              <div class="green lighten-5 d-flex justify-space-between">
                <v-btn icon v-if="userPersInfoValid">
                  <v-icon class="mdi-48px green--text">mdi-account-check</v-icon>
                </v-btn>
                <v-btn color="primary" class="text-capitalize ma-1 text-right" rounded
                  @click="verifieInfoPersonnelle"
                  :disabled="btnVerifieUserInfo"
                  >Vérifier</v-btn
                >
              </div>
            </v-card>
              <v-btn color="primary" @click="e6 = 2" class="mt-3">
                Continue
              </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2">
              <v-card-title>Plan de payment</v-card-title>
              <small>Indiquez votre plan de payement</small>
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-card class="pa-5 elevation-1">
              <v-select
                :items="payements"
                label="Type de payment"
                v-model="payement"
              >
              </v-select>
              <v-text-field label="Numéro du compte" v-model="numeroCompte">
              </v-text-field>
              <v-card-subtitle>Souhaitez - vous une livraison à domicile ?</v-card-subtitle>
              <v-radio-group
                  v-model="row"
                  row
                >
                  <v-radio
                    label="Oui"
                    value="radio-1"
                  ></v-radio>
                  <v-radio
                    label="non"
                    value="radio-2"
                  ></v-radio>
              </v-radio-group>
              <div class="text-right">
                <v-btn
                color="primary"
                class="text-capitalize ma-1"
                :loading="loading"
                rounded
                @click="validerPayement"
                >
                  Validez
                </v-btn>
              </div>
            </v-card>
              <v-btn color="primary" @click="e6 = 3" class="mt-5">
                Continue
              </v-btn>
              <v-btn text class="mt-5" @click="e6 = 1">
              Retour
              </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 3" step="3">
              <v-card-title>Inventaire</v-card-title>
              <small>Le resumé de votre achat</small>
            </v-stepper-step>

            <v-stepper-content step="3">
            <v-card class="elevation-1 pa-5">
              <v-row>
                <v-col cols="6">
                  <v-card-subtitle class="font-weight-bold"
                    >Nombre de produits</v-card-subtitle
                  >
                </v-col>
                <v-col cols="6">
                  <v-card-subtitle>{{ products.length }}</v-card-subtitle>
                </v-col>
                 <v-col cols="6">
                  <v-card-subtitle class="font-weight-bold"
                    >Coût de la livraison</v-card-subtitle
                  >
                </v-col>
                <v-col cols="6">
                  <v-card-subtitle>{{ livraison.montant }}</v-card-subtitle>
                </v-col>
                <v-col cols="12">
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="6">
                  <v-card-subtitle class="font-weight-bold"
                    >Prix total</v-card-subtitle
                  >
                </v-col>
                <v-col cols="6">
                  <v-card-subtitle>{{ livraison.montantTotal }}</v-card-subtitle>
                </v-col>
              </v-row>
            </v-card>
              <div class="d-flex justify-space-between">
                <v-btn color="primary" @click="e6 = 2" class="mt-5">
                  Retour
                </v-btn>
                <v-btn color="primary" class="mt-5">
                  Valider
                </v-btn>
              </div>
            </v-stepper-content>
          </v-stepper>
        </v-row>
      </v-scroll-y-transition>
    </v-container>
    <Footer />
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
        v-model="dialog1"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">
            Confirmation
          </v-card-title>
          <v-card-text>Estes - vous sûre de bien vouloir retirer ce produit du pannier ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog1 = false"
            >
              Annuler
            </v-btn>
            <v-btn
              color="pink"
              text
              @click="confirmDelete"
            >
              Confirmer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import Header from '@/components/mainComponents/Header'
import Footer from '@/components/mainComponents/Footer'
import pannierService from '@/services/pannierService'
import userService from '@/services/userServices'
//import routeAccessControl from '@/services/auhentication/routeAccessControl'
export default {
  created() {
    this.productInCart = parseInt(localStorage.getItem('pannier'))
    this.user = JSON.parse(localStorage.getItem('user'))
    this.productList()
   
  },
  methods: {
    productList () {
     
      // pass userid
      pannierService.allCartProducts(this.user.id)
      .then((result) => {
        this.products = result.data.commandes
        console.log(this.products)
      }).catch((err) => {
        console.log(err.response.data)
      })
    },
    deleteProduct (idPannier, position) {
      this.productToDelete = idPannier
      this.productIndexToDelete = position
      this.dialog1 = true
    },
    confirmDelete () {
      pannierService.deleteCartProduct(this.productToDelete)
      .then((result) => {
        this.snackbar = true
        this.snackbarText = result.data.message
        this.dialog1 = false
        this.products.splice(this.productIndexToDelete, 1)
        this.productInCart--;
        localStorage.setItem('pannier', this.productInCart)
      }).catch((err) => {
        console.log(err.response.data)
        this.snackbar = true
        this.snackbarText = err.response.data
      })
    },
    verifieInfoPersonnelle() {
      userService.updateUserInfo({ user: this.user }).then((response) => {
        if (response.data[0] == 1) {
          this.userPersInfoValid = true
          this.btnVerifieUserInfo = true
        }
      }).catch((err) => {
        console.log(err.response.data)
      })
    },
    validerPayement() {
      this.products.forEach(element => {
        this.livraison.montantTotal+= element.quantite * element.Produit.prix
      })
      console.log(this.livraison.montantTotal)
    }
  },
  data() {
    return {
      displaySteper: false,
      loading: false,
      user: null,
      e6: 1,
      column: null,
      row: null,
      pays: ["Guinée", "Mali", "Sénégal", "Libéria"],
      villes: ["Conakry", "Coyah", "Mamou", "Labé", "Kankan"],
      pay: "",
      ville: "",
      adresse: '',
      numeroCompte: "",
      payements: ["Orange Money", "Mobile Money", "UBA", "Express"],
      payement: "",
      products: [],
      productToDelete: null,
      productIndexToDelete: null,
      snackbar: false,
      snackbarText: '',
      dialog1: false,
      productInCart: 0,
      userPersInfoValid: false,
      btnVerifieUserInfo: false,
      livraison: {
        montant: 20000,
        montantTotal: 0
      }
    }
  },
  name: "Cart",
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped></style>

