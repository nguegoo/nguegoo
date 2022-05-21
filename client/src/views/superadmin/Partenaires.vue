<template>
  <div>
    <global>
      <br /><br />
      <v-row class="mb-8">
        <v-col cols="12" md="9" lg="10" offeset="0" offset-md="3" offset-lg="2">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card-title class="font-weight-thin text-uppercase"
                  >Partanaires</v-card-title
                >
              </v-col>
              <v-col cols="12" md="3"
                v-for="(p, i) in partners"
                :key="i"
              >
                <v-hover v-slot="{ hover }">
                  <v-card
                    transition="fab-transition"
                    :elevation="hover ? 12 : 1"
                  >
                    <v-img
                      :src="require(`../../../public/images/${p.img}`)"
                    >
                    </v-img>
                    <div class="text-center">
                      <h3>{{ p.name }}</h3>
                      <h4 class="green--text">{{ p.role }}</h4>
                    </div>
                    <v-scale-transition>
                      <v-card-actions
                        v-if="hover"
                        class="d-flex justify-center darken-2 v-card--reveal display-3"
                      >
                        <v-btn color="pink" dark class="text-capitalize"
                          @click="navigateTo(`/superadmin/partenaire-detail/${p.id}`)"
                        >
                          Découvrir &nbsp;
                          <v-icon class="mdi-light">mdi-eye-circle-outline</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-scale-transition>
                  </v-card>
                </v-hover>
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
  methods: {
    navigateTo (route) {
      this.$router.push({ path: route })
    }
  },
  data () {
    return {
      partners: partenaires.partenaires
    }
  },
  components: { Global },
  name: "Partenaires"
}
</script>

<style scoped></style>
