<template>
 <div>
    <Header />
    <br><br>
    <v-container>
      <v-row justify="center">
        <v-col col="12" sm="8" md="8" lg="6">
          <v-card flat>
            <v-card-subtitle class="text-center">Quel type de compte voulez-vous créer ? client par défaut</v-card-subtitle>
            <div class="d-flex justify-space-around">
              <v-checkbox label="Client" class="mr-3 mt-2"
                v-model="typeClient"
                @click="chooseAccountType('Client',
                { type1: true, clientState: true, type2: false, vendeurState: false })"
                :disabled="clientState"
              ></v-checkbox>
              <v-checkbox label="Vendeur" class="mt-2"
                v-model="typeVendeur"
                @click="chooseAccountType('Vendeur',
                { type1: false, clientState: false, type2: true, vendeurState: true })"
                :disabled="vendeurState"
              ></v-checkbox>
            </div>
           
           
            <v-toolbar color="primary dark" extended flat dark>
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
                    color="primary"
                    dark
                    @click="validUserInput"
                    >
                      Valider
                  </v-btn>
                  <v-dialog
                    v-model="dialog1"
                    width="500"
                    persistent
                  >
                   
                    <v-card>
                      <v-card-title class="grey lighten-2">
                        Conditions générales d'utilisation(CGU)
                      </v-card-title>
                      <h3 class="pa-3 text-center">{{ compteCondition.conditionTitle }}</h3>
                      <v-card-text v-html="compteCondition.conditionText">
                      </v-card-text>
                      <div class="pa-3">
                        <v-alert
                        class="mt-2"
                        border="right"
                        colored-border
                        :type="alert1.type"
                        elevation="2"
                        :value="alert1.isAlert"
                        >
                        {{ alert1.text }}
                        </v-alert>
                      </div>
                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          :disabled="dialog"
                          :loading="dialog"
                          @click="register"
                        >
                          J'accepte
                        </v-btn>
                        <v-btn
                          color="primary"
                          text
                          @click="setDialogState(false, false)"
                        >
                          Annuler
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
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
         this.redirect(response.data.user.typeCompte)
        }, 2000)
        this.configAlert(this.alert1,'success', true, `Votre compte ${response.data.user.typeCompte} a été crée avec succès !`)
        this.dialog = false
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
        console.log(response.data)
      }).catch(error => {
        this.configAlert(this.alert,'error', true, error.response.data.error)
        this.setDialogState(false, false)
      })
     
    },
    navigateTo (route) {
      this.$router.push(route)
    },
    redirect(accountType) {
      if(accountType === 'Vendeur') {
        this.navigateTo({ path: this.routes.vendeur })
      }else {
        this.navigateTo({ path: this.routes.client })
      }
    },
    setDialogState(dialog, dialog1) {
      this.dialog = dialog
      this.dialog1 = dialog1
    },
    validUserInput() {
       this.alert.isAlert = false
       this.alert1.isAlert = false
       if (this.inputIsEmpty()) {
        this.configAlert(this.alert,'error', true, 'Tous les champs sont obligatoires')
      } else if (!this.passwordsMatch()) {
        this.configAlert(this.alert,'error', true, 'Les deux mots de passe doivent être identiques')
      }else {
        this.dialog1 = true
      }
    },
    setComponentTitle (title) {
      this.componentTitle = title
      this.msg = `Création d'un compte ` + title
    },
    chooseAccountType (name, compte) {
      if(name === 'Client') {
        conditionsGenerales.setCondition('client', this.compteCondition)
      }else {
        conditionsGenerales.setCondition('vendeur', this.compteCondition)
      }
      this.typeClient = compte.type1
      this.typeVendeur = compte.type2
      this.vendeurState = compte.vendeurState
      this.clientState = compte.clientState
      this.accountName = name
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
      typeClient: true,
      clientState: true,
      vendeurState: false,
      typeVendeur: false,
      accountName: 'Client',
      accountType: `Création d'un compte client`,
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
      dialog1: false,
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
<style></style>


