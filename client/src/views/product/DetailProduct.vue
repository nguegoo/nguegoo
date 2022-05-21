<template>
  <div>
    <Header />
    <br><br>
    <v-main class="indigo">
        <br><br>
        <div class="text-center">
          <v-icon class="mdi-light mdi-48px">mdi-view-headline</v-icon>
        </div>
        <h1 class="text-center white--text" style="font-size:5rem;">Detail</h1>
        <div class="d-flex justify-center">
          <h1 style="height:10px; width:200px;" class="white"></h1>
        </div>
        <v-row class="d-flex justify-center mb-0 pa-4 mb-4">
          <v-col cols="12" md="6" class="d-flex justify-center">
            <p style="font-size:1rem;" class="white--text">
              Lisez toutes les informations d'un produit sur cette page
            </p>
          </v-col>
        </v-row>
      </v-main>
    <v-container class="mb-6">
      <v-card>
        <v-row class="pa-4">
          <v-col cols="12" md="4">
            <v-img
              :lazy-src="`http://localhost:8081/produits/${product.image}`"
              :src="`http://localhost:8081/produits/${product.image}`"
            >
            </v-img>
          </v-col>
          <v-col cols="12" md="8">
            <h2 class="text-center mb-5 font-weight-thin">{{ product.designation }}</h2>
            <p style="font-size:1.2rem;" class="text-center mb-4">
              {{ product.description }}
            </p>
            <div class="d-flex justify-space-around">
              <v-btn icon>
                <v-icon color="pink" class="mr-2 mdi-48px">mdi-heart-circle</v-icon>
              </v-btn>
              <v-badge color="green" content="6" offset-y="2" offset-x="5">
                <v-btn icon>
                <v-icon color="indigo" class="mr-2 mdi-48px ml-4">mdi-thumb-up</v-icon>
              </v-btn>
              </v-badge>
            </div>
          </v-col>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="4">
               <div class="d-flex justify-center mb-8">
                 <v-card-title>Vendeur</v-card-title>
               </div>
                <div class="text-center">
                  <v-icon class="grey--text mdi-48px">mdi-account-heart</v-icon><br>
                  <strong>{{ vendeur.prenom + ' ' + vendeur.nom }}</strong>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <v-card-subtitle>Contacts</v-card-subtitle>
                <v-list>
                  <v-list-item v-for="(vendeur, i) in vendeur.contacts"
                    :key="i"
                  >
                    <v-list-item-icon>
                      <v-icon class="indigo--text">{{ vendeur.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ vendeur.text }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" md="4">
                <v-card-text>Posez une question au vendeur. C'est gratuit
                </v-card-text>
                <div class="text-center">
                   <v-btn icon
                    @click="showMsgBox = !showMsgBox"
                   >
                      <v-icon class="mdi-48px indigo--text">mdi-comment-text</v-icon>
                    </v-btn>
                    <v-scale-transition>
                      <v-card class="pa-3" v-if="showMsgBox">
                        <v-textarea
                          label="Votre message"
                          auto-grow
                          outlined
                          rows="1"
                          row-height="15"
                          class="mb-3"
                          v-model="msg"
                        ></v-textarea>
                        <v-alert
                          border="right"
                          colored-border
                          :type="alert.type"
                          :value="alert.value"
                          class="grey--text"
                        >
                         {{ alert.text }}
                        </v-alert>
                        <v-btn class="text-capitalize indigo white--text"
                         @click="send"
                        >
                          envoyer
                        </v-btn>
                      </v-card>
                    </v-scale-transition>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/mainComponents/Header'
import Footer from '@/components/mainComponents/Footer'
import produitServices from '@/services/produitServices'
//import api from '@/services/message/api'
export default {
  watch: {
    showMsgBox (value) {
      this.alert.value = false
      console.log(value)
    }
  },
  created() {
    this.showProduct()
    this.$socket.on('ok', function() {
      console.log('from socket server')
    })
  },
  methods: {
    showProduct () {
     this.productId =  this.$router.app.$route.params.id
      produitServices.productById(this.productId)
      .then((result) => {
        this.product = result.data.produit
        console.log(this.product)
        console.log(this.product.prix)
      }).catch((err) => {
        console.log(err.response.data)
      })
    },
    send () {
     this.$socket.emit('send-message', {
       sender: 'moussa@gmail.com',
       recepter: 'fode@gmail.com',
       message: this.msg
     })
     this.showAlert('success', true, 'Message envoyé avec succès ! ')
    },
    showAlert(type, value, text) {
      this.alert.type = type
      this.alert.value = value
      this.alert.text = text
    }
  },
  data () {
    return {
      product: null,
      productId: null,
      showMsgBox: false,
      msg: '',
      message: null,
      vendeur: {
        prenom: 'Moussa',
        nom: 'Camara',
        contacts: [
          {
            text: '(+224) 620 15 12 18',
            icon: 'mdi-card-account-phone'
          }, 
          {
            text: 'moussashop@gmail.com',
            icon: 'mdi-card-account-mail'
          },
          {
            text: 'Pays/Ville/Commune/Quartier/Rue',
            icon: 'mdi-google-maps'
          }
        ]
      },
      alert: {
        type: 'success',
        value: false,
        text: ''
      }
    }
  },
  name: 'DetailPrduct',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>

</style>
