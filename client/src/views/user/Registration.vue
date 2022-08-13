<template>
 <div class="grey lighten-4">
    <Header />
    <br><br>
    <v-container>
      <v-row justify="center">
        <v-col col="12" sm="8" md="8" lg="6">
          <v-card flat>   
            <v-toolbar class="bg-color1" extended flat dark>
             <v-card-title>Compte</v-card-title>
              <v-spacer></v-spacer>
              <v-icon class="white--text"> mdi-account </v-icon>
            </v-toolbar>
            <v-card max-height="auto" max-width="700" style="margin-top:-64px;">
              <v-toolbar flat>
                <v-card-subtitle class="grey--text">{{ accountName }}</v-card-subtitle>
              </v-toolbar>
              <v-divider></v-divider>
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        label="Prénom"
                        :rules="rules.name"
                        v-model="prenom"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                          label="Nom"
                          :rules="rules.name"
                          v-model="nom"
                        >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field
                    label="Email"
                    :rules="rules.name"
                    v-model="email"
                  >
                  </v-text-field>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        label="Mot de passe"
                        :append-icon="field.show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="rules.name"
                        :type="field.show1? 'text': 'password'"
                        v-model="mdp"
                        @click:append="field.show1 = !field.show1"
                      ></v-text-field>
                   </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        label="Confirmer le mot de passe"
                        :append-icon="field.show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="rules.name"
                        :type="field.show1? 'text': 'password'"
                        v-model="mdp1"
                        @click:append="field.show1 = !field.show1"
                      ></v-text-field>
                   </v-col>
                  </v-row>
                  <v-checkbox label="Acceptez les conditions d'utilisation"
                    v-model="licence"
                  ></v-checkbox>
                  <v-alert
                    class="mt-2"
                    border="right"
                    colored-border
                    :type="alert.type"
                    elevation="2"
                    :value="alert.isAlert"
                    >
                    {{ alert.text }}
                  </v-alert>
                  <v-btn
                    color="bg-color1"
                    dark
                    @click="validUserInput"
                    >
                      Valider
                  </v-btn>
                  
                  <v-dialog
                    v-model="dialog"
                    hide-overlay
                    persistent
                    width="300"
                  >
                    <v-card
                      color="primary"
                      dark
                    >
                      <v-card-text>
                        Traitement en cours
                        <v-progress-linear
                          indeterminate
                          color="white"
                          class="mb-0"
                        ></v-progress-linear>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  <v-card-text>
                    Avez - vous déjà un compte ?
                    <router-link to="/user/login" class="h3">
                      Se connecter
                    </router-link>
                  </v-card-text>
                </v-container>
              </v-form>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/mainComponents/Header'
import Footer from '@/components/mainComponents/Footer'
import userService from '@/services/userServices.js'
import conditionsGenerales from '@/utils/user/conditions_utilisation'
export default {
  created () {
   this.compteCondition.conditionTitle = conditionsGenerales.client.title
   this.compteCondition.conditionText = conditionsGenerales.client.text
  },
  props: {
  },
  methods: {
    register () {
      this.dialog = true
      userService.register({
      prenom: this.prenom,
      nom: this.nom,
      email: this.email,
      mdp: this.mdp,
      typeCompte: this.accountName
      }).then(response => {
        setTimeout(() => {
         this.$router.push({ path: '/magasin' })
        }, 3000)
        this.configAlert(this.alert,'success', true, `Votre compte ${response.data.user.typeCompte} a été crée avec succès !`)
        this.dialog = false
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
      }).catch(error => {
        this.configAlert(this.alert,'error', true, error.response.data.error)
      })
     
    },
    navigateTo (route) {
      this.$router.push(route)
    },
  
    validUserInput() {
       this.alert.isAlert = false
       this.alert1.isAlert = false
       if (this.inputIsEmpty()) {
        this.configAlert(this.alert,'error', true, 'Tous les champs sont obligatoires')
      } else if (!this.passwordsMatch()) {
        this.configAlert(this.alert,'error', true, 'Les deux mots de passe doivent être identiques')
      }else {
        this.register()
      }
    },
   
    
    configAlert (alert, type, isAlerted, text) {
      alert.type = type
      alert.isAlert = isAlerted
      alert.text = text
    },
    inputIsEmpty () {
      return  (this.prenom == '' || this.nom == '' || this.email == '' || this.mdp == '' || this.mdp1 == '' || this.licence == false) 
    },
    passwordsMatch () {
      return this.mdp1 === this.mdp
    }
   },
  name: "Register",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      prenom: '',
      nom: '',
      email: '',
      mdp: '',
      mdp1: '',
      accountName: 'Client',
      licence: false,
      compteCondition: {
        conditionTitle: '',
        conditionText: ''
      },
      routes: {
        client: '/',
        vendeur: '/admin/product'
      },
      msg: ``,
      rules : {
          name: [val => (val || '').length > 0 || 'Ce champs est requis']
      },
      dialog: false,
      items: [
        {
          title:  'Client'
        },
        {
          title: 'Vendeur'
        }
      ],
      field: {
        show1:false,
        password: 'Password',
        alert: false,
        text: '',
        type: 'success'
      },
      alert: {
        border: '',
        type: 'error',
        isAlert: false,
        text: 'Compte client crée avec succès !'
      },
      alert1: {
        border: '',
        type: 'error',
        isAlert: false,
        text: 'Compte client crée avec succès !'
      }
    }
  },
}
</script>
<style scoped>
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


