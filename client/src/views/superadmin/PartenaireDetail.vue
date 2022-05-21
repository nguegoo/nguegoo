<template>
  <div>
    <global>
      <br /><br />
      <v-row class="mb-8">
        <v-col cols="12" md="9" lg="10" offeset="0" offset-md="3" offset-lg="2">
          <v-container>
            <v-row justify="center">
              <v-col cols="12" md="8">
                <v-card>
                  <v-img
                    src="../../../public/images/partner-1.png"
                  >
                  </v-img>
                  <v-card-title>Partener</v-card-title>
                  <v-card-subtitle class="green--text">Role</v-card-subtitle>
                  <v-card-text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur assumenda molestias eligendi commodi rem ad, possimus et optio ipsum impedit ex officia ducimus, consectetur debitis beatae harum molestiae, in laudantium veniam? Dolore quasi error assumenda officiis laudantium fuga maxime voluptatum.
                  </v-card-text>
                  <v-divider></v-divider>
                  <div>
                    <v-card-title class="green--text">Contacts</v-card-title>
                    <v-list-item
                      v-for="(contact, i) in contacts"
                      :key="i"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="contact.icone"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="contact.name"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </global>
  </div>
</template>

<script>
import Global from "../../components/superadmin/Global.vue"
import partenaires from '@/test/partenaires.js'
export default {
  data () {
    return {
      partners: partenaires.partenaires,
      contacts: [
        {
          name:'partner.help@gmail.com',
          icone: 'mdi-email'
        },
        {
          name: '622454545',
          icone: 'mdi-phone'
        },
        {
          name: '628022121',
          icone: 'mdi-whatsapp'
        },
        {
          name: 'Guinée-Conkary-Kaloum-Corontine',
          icone: 'mdi-google-maps'
        }
      ]
    }
  },
  components: { Global },
  name: "PartenaireDetail"
}
</script>

<style scoped></style>
