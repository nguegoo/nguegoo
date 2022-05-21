<template>
  <v-container style="margin-top:100px;">
    <v-row justify="center">
      <v-col col="12" sm="8" md="8" lg="6">
        <v-card flat>
          <v-toolbar color="primary dark" extended flat>
            <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
          </v-toolbar>
          <v-card max-height="auto" max-width="700" style="margin-top:-64px;">
            <v-toolbar flat>
              <v-toolbar-title class="grey--text">Registration</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-apps</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-form>
              <v-container>
                <v-text-field
                    label="Your name"
                    :rules="rules.name"
                    v-model="name"
                >
                </v-text-field>
                <v-text-field
                    label="Email"
                    :rules="rules.name"
                    v-model="email"
                >
                </v-text-field>
                <v-text-field
                    label="Password"
                    :append-icon="field.show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="rules.name"
                    :type="field.show1? 'text': 'password'"
                    v-model="password"
                    @click:append="field.show1 = !field.show1"
                ></v-text-field>
                <v-checkbox label="Do you agree ?"></v-checkbox>
                <v-btn color="primary" @click="register">
                    Submit
                </v-btn>
                <v-card-text>
                  Already have an account ? 
                  <router-link to="/user/login" class="h3">
                    login
                  </router-link>
                </v-card-text>
                <v-alert 
                  :type="field.type"
                  class="mt-2"
                  :value="field.alert"
                  v-html="error"
                  icon="mdi-home"
                  transition="scale-transition"
                >
                  
                </v-alert>
              </v-container>
            </v-form>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import userService from '../services/userServices'
export default {
  props: {
  },
  methods: {
    register () {
        this.field.alert = false
        const user = {
            name : this.name,
            email: this.email,
            password: this.password
          }
          userService.register(user)
          .then((response) => {
            this.field.alert = true
            this.field.type = 'success'
            this.error = `You are successfully registred`
            this.user = response.data
            setTimeout(() => {
              this.navigateTo({name: 'Login'})
            }, 3000)
          }).catch((err) => {
            this.error = err.response.data.error
            this.field.alert = true
            this.field.type='error'
          })
    },
    navigateTo (route) {
      this.$router.push(route)
    }
   },
  name: "Register",
  data() {
    return {
        rules : {
            name: [val => (val || '').length > 0 || 'Ce champs est requis']
        },
        field: {
          show1:false,
          password: 'Password',
          alert: false,
          text: '',
          type: 'success'
        },
        name: '',
        email: '',
        password: '',
        error: '',
        user: null
    }
  },
};
</script>
<style></style>
