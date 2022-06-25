<template>
<div>
  <v-toolbar>
    <v-card-title>ESPACE D'AUTHENTIFICATION - COMPTE GROSSISTE</v-card-title>
  </v-toolbar>
    <v-row class="d-flex justify-center">
        <v-col cols="12" md="6" class="mt-5">
            <v-card class="pa-3 mt-5">
              <v-card-title>Authentification</v-card-title>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field type="password" v-model="password" label="mot de passe" required></v-text-field>
                <v-alert type="error" v-if="isError">
                  {{ authenticationMessage }}
                </v-alert>
                <v-btn :disabled="!valid" color="primary" class="mr-4" @click="validate"

                >
                    Valider
                </v-btn>

                <v-btn color="error" class="mr-4" @click="reset">
                    Annuler
                </v-btn>
            </v-form>
            </v-card>
        </v-col>
    </v-row>
</div>
</template>

<script>
import grossisteService from '@/services/grossisteService'
export default {
    name: 'Authentication',
    data: () => ({
      isError: false,
        valid: true,
        password: '',
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        authenticationMessage: ""
    }),

    methods: {
        validate() {
            this.$refs.form.validate()
            grossisteService.authentification({
              username: this.email,
              password: this.password
            }).then((res) => {
              localStorage.setItem('token', res.data.token)
              localStorage.setItem('user', JSON.stringify(res.data.user))
              this.$router.push({ path: '/grossiste/dashboard'})
            }).catch((err) => {
              this.authenticationMessage = err.response.data.message
              this.isError = true
            })
        },
        reset() {
            this.$refs.form.reset()
        },

    },
}
</script>
