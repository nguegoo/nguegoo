<template>
    <div>
        <v-app-bar color="white" fixed dense elevation-on-scroll>
            <v-app-bar-nav-icon
               @click.stop="drawer = !drawer"
              class="d-block d-sm-none"
            >
            </v-app-bar-nav-icon>
            <v-avatar
                size="56"
            >
                <v-img
                    :src="require('../../../public/images/ngegoo.jpg')"
                >
                </v-img>
            </v-avatar>
            <v-spacer></v-spacer>
            <v-btn text class="grey--text text-capitalize d-none  d-md-block"
                @click="navigateTo('/')"
            >
                <v-icon class="grey--text mdi-18px">mdi-home</v-icon>&nbsp;
                Accueil
            </v-btn>
            <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
                :nudge-width="200"
                class="d-none d-md-block"
            >
                <template v-slot:activator="{ attrs, on }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        text class="grey--text text-capitalize d-none d-md-block"
                        >
                        <v-icon class="grey--text mdi-18px">mdi-home-modern</v-icon>&nbsp;
                        Grossistes
                    </v-btn>
                </template>
            <v-card>
                <div class="d-flex justify-space-between">
                    <v-card-subtitle>Nos offres</v-card-subtitle>
                    <v-icon color="pink" class="mr-2">mdi-heart-circle</v-icon>
                </div>
                <v-divider></v-divider>
                <v-list>
                    <v-list-item
                    link
                    @click="navigateTo('/product/list')"
                    >
                    <v-icon style="font-size:25px;" color="pink">mdi-home-city</v-icon>
                    <v-list-item-content class="ml-2">
                        <v-list-item-title>Magasins</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                    link
                    @click="navigateTo('/product/all-detail')"
                    >
                    <v-icon style="font-size:25px;" color="pink">mdi-view-list</v-icon>
                    <v-list-item-title class="ml-2">Produits & catégories</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-card>
            </v-menu>
            <v-btn text class="grey--text text-capitalize d-none d-md-block">
              <v-icon class="grey--text mdi-18px">mdi-grease-pencil</v-icon>&nbsp;
              A propos
            </v-btn>
            <v-badge
                color="green"
                :content="productInCart"
                offset-y="25"
                offset-x="26"
                class="d-none d-md-block"
            >
                <v-btn icon class="mr-3 d-none d-md-block"
                @click="goToCart"
                >
                    <v-icon>mdi-cart-variant</v-icon>
                </v-btn>
            </v-badge>
            <v-btn color="indigo" dark class="text-capitalize d-none d-md-block"
                @click="navigateTo('/user/registration')"
            >
            Inscription</v-btn>
            <div class="text-center">
                <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    >
                    <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    link
                    @click="userAuth"
                    >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
            </div>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" fixed temporary class="mt-10" flat
            color="indigo"
        >
            <v-list nav dense>
                <v-list-item-group
                v-model="group"
                active-class="deep-purple--text text--accent-4"
                >
                    <v-list-item
                      @click="navigateTo('/')"
                    >
                        <v-list-item-icon>
                            <v-icon class="white--text mdi-20px">mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="white--text">Accueil</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon style="margin-top:10px">
                            <v-icon class="white--text mdi-20px">mdi-home-modern</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-menu
                                bottom
                                origin="center center"
                                transition="scale-transition"
                                :nudge-width="200"
                            >
                                <template v-slot:activator="{ attrs, on }">
                                    <v-btn
                                        v-bind="attrs"
                                        v-on="on"
                                        text class="white--text text-capitalize"
                                        style="left: -52px"
                                        >
                                        Boutique
                                    </v-btn>
                                </template>
                                <v-card>
                                    <div class="d-flex justify-space-between">
                                        <v-card-subtitle>La boutique</v-card-subtitle>
                                        <v-icon color="pink" class="mr-2">mdi-heart-circle</v-icon>
                                    </div>
                                    <v-divider></v-divider>
                                    <v-list>
                                        <v-list-item
                                        link
                                        @click="navigateTo('/product/list')"
                                        >
                                        <v-icon style="font-size:25px;" color="pink">mdi-food</v-icon>
                                        <v-list-item-content class="ml-2">
                                            <v-list-item-title>Produits</v-list-item-title>
                                        </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item
                                        link
                                        @click="navigateTo('/product/all-detail')"
                                        >
                                        <v-icon style="font-size:25px;" color="pink">mdi-head</v-icon>
                                        <v-list-item-title class="ml-2">produits & informations</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-card>
                            </v-menu>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon class="white--text mdi-20px">mdi-information</v-icon>&nbsp;
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="white--text">A propos</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-badge
                                color="green"
                                :content="productInCart"
                                offset-y="10"
                                offset-x="26"
                                >
                                    <v-btn icon class="mr-3"
                                      @click="goToCart"
                                      style="margin-left: -10px"
                                    >
                                        <v-icon class="mdi-light mdi-20px">mdi-cart-variant</v-icon>
                                    </v-btn>
                            </v-badge>
                        </v-list-item-icon>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon class="mdi-light mdi-20px">mdi-account-edit</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="white--text">Inscription</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
//import pannierService from '@/services/pannierService'
export default {
 props: {
    productInCart: {
      type: Number,
      default: 0
    }
 },
 created() {
    /*if (localStorage.getItem('token') !== 'no') {
        this.items[0].title = 'Deconnexion'
        let user = JSON.parse(localStorage.getItem('user'))
        console.log("userId: ", user.id)
        pannierService.allCartProducts(user.id)
        .then((result) => {
            this.panniers = result.data.commandes
            this.productInCart = this.panniers.length
            localStorage.setItem('pannier', this.panniers.length)
        }).catch((err) => {
            console.log(err.response.data)
        })
    }else {
        this.items[0].title = 'Connexion'
    }*/
  },
  data () {
    return {
      drawer: false,
      group: null,
      items: [
        {
          id: 1,
          title: 'Connexion'
        }
      ],
      panniers: [],
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
    name: 'page-header',
    methods: {
        navigateTo (route) {
            this.$router.push({ path: route })
        },
        userAuth () {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.items[0].title = 'Connexion'
            localStorage.setItem('token', 'no')
            localStorage.setItem('pannier', 0)
            localStorage.setItem('user', null)
            this.$router.push({ path: '/user/login'})
        },
        goToCart() {
            if (localStorage.getItem('token') !== 'no'){
                this.navigateTo('/product/cart')
            }else {
                this.navigateTo('/user/login')

            }
        }
    },
}
</script>
<style scoped>
    .logout {
        cursor: pointer;
    }
</style>
