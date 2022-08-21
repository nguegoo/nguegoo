<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app
    class="amin-bg-color" dark>
        <v-list>
            <v-list-item link>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        Grossistes
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list nav dense>
            <h4 class="white--text mb-2">
                Favoris</h4>
            <v-list-item-group color="white">
                <v-list-item v-for="(item, i) in grossistes" :key="i" @click="productOf(item)">
                    <v-list-item-icon>
                        <v-icon>mdi-account-heart</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="item.entreprise"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense color="bg-color2" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
         <v-toolbar-title>Magasin - Camara et frère</v-toolbar-title>
         <v-spacer></v-spacer>
         <v-btn color="white primary--text"
         @click="navigateTo('/magasin')" rounded>
            Magasin
         </v-btn>
         <v-btn icon color="white"
         @click="navigateTo('/user/pannier')">
           <v-icon class="mdi-24px">mdi-cart-variant</v-icon>
         </v-btn>
    </v-app-bar>

    <v-main style="margin: 0px!important; padding: 0px!important;">
        <slot>
          content here
        </slot>
    </v-main>
</v-app>
</template>
<script>
import grossisteService from '@/services/grossisteService'
export default {
  name: 'CartnavbarComponent',
  data() {
    return {
      drawer: true,
      grossistes: [],
      defaultGrossiste: null
    }
  },
   methods: {
        productOf(grossiste) {
            this.$emit('init-setting-cart', grossiste)
        },
        navigateTo(path) {
            this.$router.push({ path: path })
        },
        getCategorie(categorie) {
            this.$emit('init-setting-categorie', categorie)
        },
       secrureClientInterface() {
            const token = localStorage.getItem('user')
            if(token == null) {
               this.$router.push({ path: '/user/login' })
            }else {
                this.initialize()
            }
        },
       
        initialize() {
            grossisteService.listGrossiste()
            .then((grossistes) => {
                this.grossistes = grossistes.data
                this.$emit('get-grossiste-liste', this.grossistes)
            }).catch((err) => {
                console.log(err)
            });
        }
    },
    created() {
        this.secrureClientInterface()
    },

 
}
</script>
<style scoped>
.text-color {
  color: #4568DC!important;
}
.text-color1 {
  color: #B06AB3!important;
}
.bg-color1{
  background: #B06AB3!important;
}
.bg-color2 {
   background-color: #4568DC!important;
}
.amin-bg-color {
 background: #4568DC;  /* fallback for old browsers */
background: -webkit-linear-gradient(to top, #B06AB3, #4568DC);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to top, #B06AB3, #4568DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>