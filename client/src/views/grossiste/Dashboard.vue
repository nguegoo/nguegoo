<template>
  <main>
    <global>
      <v-container fluid>
      <br/>
        <v-row>
          <!-- Data an statistics -->
          <v-col cols="12" md="7" lg="8" offeset="0" offset-md="3" offset-lg="2">
            <v-card-title>Données et statisques</v-card-title>
            <v-row class="pa-2">
              <v-col cols="6" md="4" sm="5"
                v-for="hist in [1, 2, 3]"
                :key="hist"
              >
                <v-card
                  class="mx-auto"
                  max-width="344"
                >
                  <v-card-text>
                    <div>Histogramme des</div>
                    <p class="text-h4 text--primary">
                      PRODUITS
                    </p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      text
                      color="primary"
                      @click="reveal = true"
                    >
                    Details
                    </v-btn>
                  </v-card-actions>
                  <v-expand-transition>
                    <v-card
                      v-if="reveal"
                      class="transition-fast-in-fast-out v-card--reveal"
                      style="height: 100%;"
                    >
                      <v-card-text class="pb-0">
                        <p class="text-h4 text--primary">
                          DETAILS
                        </p>
                        <p>contenu...</p>
                      </v-card-text>
                      <v-card-actions class="pt-0">
                        <v-btn
                          text
                          color="primary"
                          @click="reveal = false"
                        >
                          Fermer
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-expand-transition>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card
                  class="mx-auto"
                  elevation="5"
                >
                  <v-card-text>
                    <p class="text-h4 text--primary font-weight-thin text-center">
                      Courbe d'évlolution de la souscription des clients
                    </p>
                    <p>adjective</p>
                    <div class="text--primary">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsum eius rerum consequatur nulla nam.
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="15"
            :value="value"
            color="primary"
            class="mt-10"
          >
            {{ value }}
          </v-progress-circular>
          </v-col>
          <v-col cols="4" md="2" lg="2">
            <v-card
              outlined
            >
              <v-card-text>
                <p class="text-center">
                 <v-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-avatar>
                </p>
                <div class="h4 text--primary text-center">
                  {{  user.nom }}
                </div>
                <v-card-subheader class="text-center">{{ user.email }}</v-card-subheader>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  icon
                >
                  <v-icon class="primary--text">mdi-cog</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-date-picker
              class="mt-1"
              v-model="picker"
              elevation="15"
              full-width
            ></v-date-picker>
          </v-col>
        </v-row>
      </v-container>
    </global>
  </main>
</template>
<script>
import Global from "@/components/admin/Global";

export default {
  created () {
    const token = localStorage.getItem('token')
    console.log(token)
    if(token == null) {
      this.$router.push({ path: '/grossiste/authentication' })
    }else {
      this.$store.dispatch('setToken', localStorage.getItem('token'))
      this.$store.dispatch('setUser', JSON.parse(localStorage.getItem('user')))
      this.user = JSON.parse(localStorage.getItem('user'))
    }
  },
  data() {
    return {
     reveal: false,
     user: null,
     picker: null,
     value: 0,
     interval: {}
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 10
    }, 1000)
  },
  name: "Dashboard",
  components: {
    Global,
  },
}
</script>
<style scoped>
  .v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }
</style>
