<template>
  <CartnavbarComponent
  v-on:init-setting-cart="getProducts"
  v-on:get-grossiste-liste="grossisteListe">
      <div>
    <v-container class="mt-8">
      <v-row class="text-center d-flex justify-center">
        <v-badge color="green" :content="products.length" offset-y="6" offset-x="20">
          <v-icon class="text-color"
          style="font-size: 30px">mdi-cart-variant</v-icon>
        </v-badge>
      </v-row>
      <h1 class="text-center text-color" style="font-size:2.5rem;">Panier</h1>
      
    </v-container>
    <v-container class="mb-8">
      <v-simple-table dense>
        <template v-slot:default>
          <thead class="indigo lighten-5">
            <tr>
              <th class="text-left">
                Nom
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
              <td class="text-center">
                <v-card-subtitle class="font-weight-bold">
                {{ pannier.Produit.designation }}</v-card-subtitle>
              </td>
              <td class="font-weight-bold">{{ pannier.PrixProduit.prix + " GNF" }}</td>
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
                {{ (pannier.quantite * pannier.PrixProduit.prix) + " GNF" }}
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
      <v-row>
        <v-col cols="12">
          <v-card class="pa-2">
            <v-card-title>Montant total de la commande</v-card-title>
            <h2> {{ totalCommande }} GNF</h2>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="text-center">
            <v-btn rounded class="bg-color1 white--text"
            @click="validerCommande">Valider</v-btn>
          </div>
        </v-col>
      </v-row>
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
  </CartnavbarComponent>
</template>
<script>
import CartnavbarComponent from '@/components/user/CartnavbarComponent'
import pannierService from '@/services/pannierService'
import userService from '@/services/userServices'
export default {
  name: 'PannierView',
  components: {
    CartnavbarComponent
  },
  created() {
    /**this.productInCart = parseInt(localStorage.getItem('pannier'))
    this.productList()*/
    this.user = JSON.parse(localStorage.getItem('user'))
    
  },
  methods: {
    initialize() {
      const token = localStorage.getItem('token')
      if(token == null) {
        alert('invalide token')
      }else {
        userService.listeCommande(token, this.grossiste)
        .then((res) => {
          this.products = res.data
          this.products.forEach(prod => {
            this.totalCommande += prod.quantite * prod.PrixProduit.prix
          });
          /*console.log(res)
          console.log(this.totalCommande)*/
        }).catch((err) => {
          console.log(err)
        });
      }
    },
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
        this.livraison.totalCommande+= element.quantite * element.Produit.prix
      })
      console.log(this.livraison.totalCommande)
    },
    // pannier management
    getProducts(info) {
      this.grossiste = info
    },
    validerCommande() {
      let cmds = []
      this.products.forEach(cmd => {
        cmds.push({ id: cmd.id, quantite: cmd.quantite })
      });
      pannierService.soumission_commande({ commandes: cmds })
      .then((res) => {
        console.log(res)
        this.initialize()
      }).catch((err) => {
        console.log(err)
      });
    },
    grossisteListe(grossistes) {
      this.grossistes = grossistes
      //console.log(this.grossistes)
      const token = localStorage.getItem('token')
      if(token == null) {
        alert('invalide token')
      }else {
        this.grossiste = this.grossistes[0].id
        userService.listeCommande(token, this.grossistes[0].id)
        .then((res) => {
          this.products = res.data
          this.products.forEach(prod => {
            this.totalCommande += prod.quantite * prod.PrixProduit.prix
          });
          console.log(res)
          console.log(this.totalCommande)
        }).catch((err) => {
          console.log(err)
        });
      }
    }
  },
  data() {
    return {
      totalCommande: 0,
      grossistes: [],
      grossiste: null,
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
        totalCommande: 0
      }
    }
  },
}
</script>
<style>
.text-color {
  color: #4568DC!important;
}
</style>
