<template>
    <global>
          <v-card bordred>
            <v-toolbar>
              <v-breadcrumbs :items="items"></v-breadcrumbs>
            </v-toolbar>
            <v-card>
              <v-card-title>
                Commandes... &nbsp;&nbsp;
                <v-divider vertical class="ml-2"></v-divider>
                <v-btn
                  fab
                  dark
                  class="ml-2"
                  icon
                >
                <v-icon class="indigo--text mdi-spin mdi-48px">mdi-loading</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="commandes"
                :search="search"
              >
              <template v-slot:item.img="{ item }">
                <v-row>
                  <v-cols cols="1">
                    <v-img
                      :src="require(`../../../public/images/${item.img}`)"
                      height="40px"
                      width="30px"
                    >
                    </v-img>
                  </v-cols>
                </v-row>
              </template>
                <template v-slot:item.actions="{ item }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon
                        @click="detailCmd(item)"
                        v-bind="attrs"
                        v-on="on"
                      >
                      <v-icon
                        class="grey--text"
                      >
                        mdi-apps
                      </v-icon>
                      </v-btn>
                    </template>
                  <span>Afficher les détails</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon
                        @click="select('delete', item)"
                        v-bind="attrs"
                        v-on="on"
                      >
                      <v-icon
                        class="red--text"
                      >
                       mdi-cancel
                    </v-icon>
                      </v-btn>
                    </template>
                  <span>Annuler cette commande</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon
                        @click="select('delete', item)"
                        v-bind="attrs"
                        v-on="on"
                      >
                     <v-icon
                      class="indigo--text"
                    >
                      mdi-checkbox-marked-circle
                    </v-icon>
                      </v-btn>
                    </template>
                  <span>Valider la commande</span>
                </v-tooltip>
                </template>
              </v-data-table>
            </v-card>
          </v-card>
         <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Ligne de commandes de: 
            {{ client }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        
              <v-data-table
                :headers="lignesCommandeHeaders"
                :items="lignesCommande"
                :search="search"
              >
              <template v-slot:item.img="{ item }">
                <v-row>
                  <v-cols cols="1">
                    <v-img
                      :src="require(`../../../public/images/${item.img}`)"
                      height="40px"
                      width="30px"
                    >
                    </v-img>
                  </v-cols>
                </v-row>
              </template>
                <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon
                        @click="select('delete', item)"
                        v-bind="attrs"
                        v-on="on"
                      >
                      <v-icon
                        class="red--text"
                      >
                       mdi-cancel
                    </v-icon>
                      </v-btn>
                    </template>
                  <span>Annuler cette commande</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon
                        @click="select('delete', item)"
                        v-bind="attrs"
                        v-on="on"
                      >
                     <v-icon
                      class="indigo--text"
                    >
                      mdi-checkbox-marked-circle
                    </v-icon>
                      </v-btn>
                    </template>
                  <span>Valider la commande</span>
                </v-tooltip>
                </template>
              </v-data-table>
              <v-row class="d-flex justify-center">
                <v-col cols="12" md="6">
                  <v-card>
                    <v-card-title>{{ cmdMessage }}</v-card-title>
                    <div class="text-center mb-4">
                      <h2 class="display-0 mb-5"
                      >Montant Total: <strong>{{ montantTotal }}</strong> GNF</h2>
                      <v-btn rounded class="mb-2 bg-color2 white--text"
                        @click="validerCommande"
                        v-if="cmdEstValide"
                      >Valider la commande</v-btn>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
      </v-card>
    </v-dialog>
    <SimpleDialog
    :simpleDialog="simpleDialog" :title="titreSimpleDialog"
    v-on:hide-dialog="hide"
    >
      <v-card-text>
        Commande validée avec succès !
      </v-card-text>
    </SimpleDialog>
  </v-row>
    </global>
</template>

<script>
import Global from '@/components/admin/Global'
import grossisteService from '@/services/grossisteService'
import pannierService from '@/services/pannierService'
import SimpleDialog from '@/components/utils/Dialog/SimpleDialog'
import { mapGetters} from 'vuex'
export default {
  methods: {
    ...mapGetters(['getToken']),
    select (type, element) {
      alert(type + ' ' + 'élément ' + element.id)
    },
    detailCmd(item){
      this.lignes = []
      this.dialog = true 
      this.client = item.User.nom
      console.log(item)
      if(item.statut !== "T") {

        this.cmdEstValide = true
        this.cmdMessage = "Validation de la commande"
      }else  {
        this.cmdEstValide = false
        this.cmdMessage = "Commande déjà validée !"
      }
      pannierService.getCommandLigne(item.User.id, this.getToken(), item.statut)
      .then((res) => {
        this.lignesCommande = res.data
        console.log(this.lignesCommande)
        for(let i = 0; i < this.lignesCommande.length; i++) {
          this.lignesCommande[i]['montant'] = 
          this.lignesCommande[i].quantite * this.lignesCommande[i].PrixProduit.prix
          this.montantTotal += this.lignesCommande[i].quantite * this.lignesCommande[i].PrixProduit.prix
          this.lignes.push(this.lignesCommande[i].id)
          this.detailsCommande.push({
            produitId: this.lignesCommande[i].Produit.id,
            quantite: this.lignesCommande[i].quantite
          })
        }
        //console.log(this.lignes)
      }).catch((err) => {
        console.log(err)
      });
    },
    validerCommande() {
      pannierService.validerCommande({
        lignes: this.lignes,
        details: this.detailsCommande
      }, this.token)
      .then((res) => {
        this.simpleDialog = true
        this.cmdEstValide = false
        console.log(res)
      }).catch((err) => {
        console.log(err)
      });
    },
    navigateTo (route) {
      this.$router.push({ path: route })
    },
    hide() {
      this.simpleDialog = false
    },
    initialize(token) {
      grossisteService.commandeParGrossiste(token)
      .then((res) => {
       this.commandes = res.data
       console.log(this.commandes)
      }).catch((err) => {
        const status = err.response.status
        if(status == 500) {
          alert("Erreur de recupération des commandes")
        }else {
          this.$router.push({ path: '/grossiste/authentication'})
        }
       
      });
    }
  },
  created() {
    setTimeout(() => {
      this.token = this.getToken()
      this.initialize(this.token)
    }, 2000);
  },
  data () {
    return {
      client: null,
      montantTotal: 0,
      dialog: false,
      token: null,
      search: '',
      simpleDialog: false,
      cmdEstValide: true,
      cmdEnCours: false,
      cmdMessage: 'Validation de la commande',
      titreSimpleDialog: 'Information',
      headers: [
        { text: 'ID', value: 'Produit.id' },
        {
          text: 'Client',
          align: 'start',
          sortable: true,
          value: 'User.nom'
        },
        { text: 'Quartier', value: 'User.quartier' },
        { text: 'Téléphone', value: 'User.telephone' },
        { text: 'Etat de commande', value: 'etat' },
        { text: 'Statut', value: 'statut'},
        { text: 'Actions', value: 'actions' }
      ],
      lignesCommandeHeaders: [
        { text: 'ID', value: 'id'},
        {text: 'Designation', value: 'Produit.designation'},
        {text: 'Quantite', value: 'quantite'},
        {text: 'Prix unitaire', value: 'PrixProduit.prix'},
        {text: 'Montant total', value: 'montant'}
      ],
     commandes: [],
     lignesCommande: [],
     lignes: [], // ids d'une ligne
     detailsCommande: [], // prouitId et quantite commandée
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          to: "/grossiste/dashboard"
        },
        {
          text: 'Produits',
          disabled: false,
          to: '/grossiste/product'
        },
        {
          text: 'Catégories',
          disabled: false,
          to: '/grossiste/category'
        },
        {
          text: 'Commandes',
          disabled: false,
          to: '/grossiste/commandes'
        }
      ]
    }
  },
  name: 'Commande',
  components: {
    Global,
    SimpleDialog
  }
}
</script>

<style scoped>
.bg-color2 {
    background-color: #4568DC !important;
}
</style>

