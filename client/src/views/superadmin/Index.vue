<template>
  <div>
    <global>
      <br><br>
      <v-row>
        <v-col cols="12" md="9" lg="10" offeset="0" offset-md="3" offset-lg="2">
          <v-toolbar dense class="mb-3">
            <v-card-title>
              <v-icon class="mdi-28px">mdi-account-multiple-check-outline</v-icon>
                <span class="ml-3">Clients</span>
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
          <v-data-table :headers="headers" :items="clients" :search="search">
            <template v-slot:item.action="{ item }"><btn icon></btn>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="navigateTo(`/superadmin/client-detail/${item.id}`)"
                  >
                    <v-icon>mdi-apps</v-icon>
                  </v-btn>
                </template>
                <span>Plus de details</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </global>
  </div>
</template>

<script>
import Global from "../../components/superadmin/Global.vue";
import clientData from "@/test/client.js";
export default {
  methods: {
    moreDetails (item) {
      alert(item.prenom)
    },
    navigateTo (route) {
      this.$router.push({ path: route })
    }
  },
  data() {
    return {
      search: null,
      headers: clientData.headers,
      clients: clientData.clients,
    }
  },
  components: { Global },
  name: "Index"
}
</script>

<style scoped></style>

