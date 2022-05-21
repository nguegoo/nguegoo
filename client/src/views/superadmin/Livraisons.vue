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
          <v-data-table :headers="headers" :items="livraisons" :search="search">
            <template v-slot:item.vendeur="{ item }">
                <v-btn icon
                    color="primary"
                    @click="navigateTo(`/superadmin/client-detail/${item.vendeur}`)"
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
        </v-col>
      </v-row>
    </global>
  </div>
</template>

<script>
import Global from "../../components/superadmin/Global.vue";
import livraison from "@/test/livraisons.js"
export default {
  methods: {
    moreDetails (item) {
      alert(`La livraison n°${item.id} est en cours`)
    },
    navigateTo (route) {
      this.$router.push({ path: route })
    }
  },
  data() {
    return {
      search: null,
      headers: livraison.headers,
      livraisons: livraison.livraisons
    }
  },
  components: { Global },
  name: "Livraisons"
}
</script>

<style scoped></style>

