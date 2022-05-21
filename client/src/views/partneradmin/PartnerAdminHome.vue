<template>
  <div>
    <global>
     <br><br>
      <v-row>
        <v-col cols="12" md="9" lg="10" offeset="0" offset-md="3" offset-lg="2">
          <v-toolbar dense class="mb-3">
            <v-card-title>
              <v-icon class="mdi-28px">mdi-bus-double-decker</v-icon>
                <span class="ml-3">Livraisons</span>
             </v-card-title>
             <v-spacer></v-spacer>
             <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Rechercher"
                single-line
                hide-details
              ></v-text-field>
          </v-toolbar>
          <v-data-table :headers="headers" :items="livraisons" :search="search"
           >
             <template v-slot:item.date_livraison="props">
                <v-edit-dialog
                    :return-value.sync="props.item.date_livraison"
                    @save="save"
                    @open="open"
                    @cancel="cancel"
                    @close="close"
                >
                    {{ props.item.date_livraison }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="props.item.date_livraison"
                            label="Modifier"
                            type="date"
                            single-line
                        >
                        </v-text-field>
                    </template>
                </v-edit-dialog>
             </template>
             <template v-slot:item.heure_livraison="props">
                <v-edit-dialog
                    :return-value.sync="props.item.heure_livraison"
                    @save="save"
                    @open="open"
                    @cancel="cancel"
                    @close="close"
                >
                    {{ props.item.heure_livraison }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="props.item.heure_livraison"
                            label="Modifier"
                            type="time"
                            single-line
                        >
                        </v-text-field>
                    </template>
                </v-edit-dialog>
             </template>
             <template v-slot:item.action="{ item }">
                <v-btn icon
                    color="primary"
                    @click="navigateTo(`/partneradmin/livraision-detail/${item.id}`)"
                >
                    <v-icon>mdi-eye-circle-outline</v-icon>
                </v-btn>
             </template>
             <template v-slot:item.etat="{ item }">
                <v-icon class="mdi-spin red--text"
                    @click="moreDetails(item)"
                >mdi-loading</v-icon>
            </template>
          </v-data-table>
          <v-snackbar
            v-model="snack"
            :timeout="3000"
            :color="snackColor"
            >
            {{ snackText }}

            <template v-slot:action="{ attrs }">
                <v-btn
                v-bind="attrs"
                text
                @click="snack = false"
                >
                Close
                </v-btn>
            </template>
            </v-snackbar>
        </v-col>
      </v-row>
    </global>
  </div>
</template>

<script>
import Global from '../../components/partneradmin/Global.vue'
import livraisons from '@/test/livraisons.js'
export default {
   methods: {
    navigateTo (route) {
      this.$router.push({ path: route })
    },
    moreDetails (item) {
      alert(`La livraison n°${item.id} est en attente`)
    },
    save () {
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Traitement effectué avec succès !'
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Traitement annulé'
      },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Traitement initialisé'
      },
      close () {
        console.log('Dialog closed')
      }
  },
  data () {
    return {
        headers: livraisons.headers,
        livraisons: livraisons.livraisons,
        search: null,
        snack: false,
        snackColor: '',
        snackText: ''
    }
  },
  components: { Global },
  name: 'PartnerAdminHome'
}
</script>

<style scoped>

</style>
