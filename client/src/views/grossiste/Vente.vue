<template>
    <global>
    <br><br>
      <v-row class="mb-8">
        <v-col cols="12" md="9" lg="10" offeset="0" offset-md="3" offset-lg="2">
          <v-card bordred>
            <v-toolbar>
              <v-card-title>Liste des ventes</v-card-title>
            </v-toolbar>
            <v-card style="margin-top:-1%;">
              <v-card-title>
                <v-icon class="mdi-28px grey--text">mdi-stack-exchange</v-icon>
                <v-divider vertical class="ml-2"></v-divider>
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
                :items="products"
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
                      mdi-delete
                    </v-icon>
                      </v-btn>
                    </template>
                  <span>Supprimer</span>
                </v-tooltip>
                </template>
              </v-data-table>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </global>
</template>

<script>
import Global from '@/components/admin/Global'
import productData from '../../test/productData'
export default {
  methods: {
    select (type, element) {
      alert(type + ' ' + 'élément ' + element.id)
    },
    navigateTo (route) {
      this.$router.push({ path: route })
    }
  },
  data () {
    return {
      search: '',
      headers: productData.headers,
      products: productData.recentProduct,
      items: [
        {
          text: 'Dashboard',
          disabled: true,
        },
        {
          text: 'Produits',
          disabled: false,
          to: '/admin/product'
        },
        {
          text: 'Catégories',
          disabled: false,
          to: '/admin/category'
        },
        {
          text: 'Commandes',
          disabled: false,
          to: '/admin/commandes'
        }
      ]
    }
  },
  name: 'Vente',
  components: {
    Global
  }
}
</script>

<style scoped>

</style>

