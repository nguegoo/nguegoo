<template>
    <div class="grey lighten-4">
       <Header />
        <br><br><br>
        <v-container>
            <v-row justify="center">
                    <v-col
                        col="12"
                        sm="8"
                        md="8"
                        lg="6"
                    >
                    <v-card>
                        <v-toolbar color="bg-color1" extended flat>
                            <v-app-bar-nav-icon class="white--text"></v-app-bar-nav-icon>
                        </v-toolbar>
                        <v-card flat style="margin-top:-64px;">
                            <v-toolbar flat>
                                <v-toolbar-title class="grey--text">Login</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-divider></v-divider>
                            <v-container>
                                <v-text-field
                                 label="Your email"
                                 v-model="email"
                                 :rules="rules.field"
                                >
                                </v-text-field>
                                <v-text-field
                                 label="Password"
                                 :type="showPassword ? 'text' : 'password'"
                                 v-model="mdp"
                                 :rules="rules.field"
                                 :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'"
                                 @click:append="showPassword = !showPassword"
                                >
                                </v-text-field>
                                <v-card-text>
                                   Vous n'avez encore de compte  ?
                                    <router-link to="/user/registration" class="h4">
                                        inscription
                                    </router-link>
                                </v-card-text>
                                <v-btn
                                 color="primary"
                                 @click="login"
                                >
                                    connexion
                                </v-btn>
                                <v-alert
                                    border="right"
                                    colored-border
                                    :type="alert.type"
                                    :value="alert.show"
                                    transition="scale-transition"
                                    class="mt-2"
                                >
                                  {{ alert.message }}
                                </v-alert>
                            </v-container>
                        </v-card>
                    </v-card>
                </v-col>
            </v-row>
            <v-dialog
                v-model="dialogLoading"
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
        </v-container>
        <Footer />
    </div>
</template>
<script>
import Header from '@/components/mainComponents/Header'
import Footer from '@/components/mainComponents/Footer'
import userServices from '@/services/userServices.js'
export default {
  created () {
  },
    name: 'Login',
    components: {
      Header,
      Footer
    },
    data() {
        return {
            email: '',
            mdp: '',
            client: true,
            vendeur: false,
            dialog: false,
            dialogLoading: false,
            compte: 'client',
            rules: {
                field: [val => (val || '').length > 0 || 'Ce champs est obligatoire']
            },
            showPassword: false,
            alert: {
                type:'success',
                show: false,
                message: ''
            }
        }
    },
    methods: {
        login () {
            this.dialogLoading = true
            userServices.login({
                username: this.email,
                password: this.mdp
            }).then(response => {
                this.dialogLoading = false
               setTimeout(() => {
                    this.navigateTo(this.$store.state.route.from.path)
                }, 1500)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
                this.configAlert('success', true, 'Connecté avec succès ! ')
            }).catch(err => {
                this.dialogLoading = false
                this.configAlert('error', true, err.response.data.message)
                console.log(err.response.data)
            })
        },
        navigateTo (route) {
            this.$router.push({ path: route })
        },
        configAlert (type, isAlerted, text) {
            this.alert.type = type
            this.alert.show = isAlerted
            this.alert.message = text
        },
        
    }
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