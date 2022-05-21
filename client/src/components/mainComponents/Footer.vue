<template>
  <div>
    <v-main class="indigo">
       <v-row>
        <v-col cols="12" md="4">
          <v-card-title class="white--text">Contacts</v-card-title>
            <v-list-item
              v-for="(contact, i) in contacts"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon v-text="contact.icone" class="mdi-light"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="contact.name" class="white--text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </v-col>
        <v-col cols="12" md="4">
          <v-card-title class="white--text">Partenaires</v-card-title>
          <v-list-item v-for="partenaire in partenaires" :key="partenaire">
            <v-list-item-content>
              <v-list-item-title class="white--text">{{ partenaire }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="12" md="4">
          <v-card-title class="white--text">Suivez - nous sur</v-card-title>
          <v-list-item v-for="(social, i) in mediaSociaux" :key="i">
            <v-list-item-icon>
              <v-icon class="mdi-light">{{ social.icone }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text" link>
                  {{ social.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-card-subtitle class="white--text">
            <span class="font-weight-thin white--text">NGUEGOO</span>&nbsp;
            <v-icon class="mdi-light">mdi-copyright</v-icon>&nbsp;2022&nbsp;
            Tous drois réservés
          </v-card-subtitle>
        </v-col>
       </v-row>
    </v-main>
  </div>
</template>

<script>
export default {
  data () {
    return {
        contacts: [
          {
            name:'nguegoo@gmail.com',
            icone: 'mdi-email'
          },
          {
            name: '(+224)628 79 93 00',
            icone: 'mdi-phone'
          },
          {
            name: '628 79 93 00',
            icone: 'mdi-whatsapp'
          }
        ],
        partenaires: ['Orange', 'MTN', 'UBA'],
        mediaSociaux: [
          {
            name: 'notre page facebook',
            icone: 'mdi-facebook'
          },
          {
            name: 'Twitter',
            icone: 'mdi-twitter'
          },
          {
            name: 'Instagram',
            icone: 'mdi-instagram'
          }
       ]
    }
  },
  name: 'Footer'
}
</script>

<style scoped>

</style>
