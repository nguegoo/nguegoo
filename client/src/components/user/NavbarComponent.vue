<template>
<v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
        <v-list>
            <v-list-item link>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        Catégories
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list nav dense>
            <v-list-item-group v-model="selectedItemCategorie" color="primary">
                <v-list-item v-for="(item, i) in categories" :key="i" @click="getCategorie(item)">
                    <v-list-item-icon>
                        <v-icon>mdi-clipboard-list</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.designation }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer v-model="drawer" app right>
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
            <h4 class="grey--text mb-2">
                Favoris</h4>
            <v-list-item-group v-model="selectedItem" color="primary">
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

    <v-app-bar app dense color="white">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
         <v-toolbar-title>Magasin - Camara et frère</v-toolbar-title>
         <v-spacer></v-spacer>
         <v-btn icon color="primary">
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
    name: 'NavbarComponent',
    components: {

    },
    data() {
        return {
            drawer: true,
            selectedItem: 0,
            selectedItemCategorie: 0,
            categories: [{id: 0, designation: 'All'}],
            grossistes: [
                {

                }
            ]
        }
    },
    methods: {
        productOf(grossiste) {
            this.categories = [{id: 0, designation: 'All'}]
            this.$emit('init-setting-grossiste', grossiste)
            grossisteService.listeCategoryByGrossiste(grossiste.id)
            .then((categories) => {
                categories.data.forEach(cat => {
                    if(this.categories.findIndex(el => el.id == cat.CategorieProduit.id) == -1) {
                        this.categories.push(cat.CategorieProduit)
                    }
                });
               console.log(this.categories)
            }).catch((err) => {
                console.log(err)
            });
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
        categorieByGrossiste(grossisteId) {
            grossisteService.listeCategoryByGrossiste(grossisteId)
            .then((categories) => {
                categories.data.forEach(cat => {
                    if(this.categories.findIndex(el => el.id == cat.CategorieProduit.id) == -1) {
                        this.categories.push(cat.CategorieProduit)
                    }
                });
               console.log(this.categories)
            }).catch((err) => {
                console.log(err)
            });
        },
        initialize() {
            grossisteService.listGrossiste()
            .then((grossistes) => {
                this.grossistes = grossistes.data
                const defaultGrossiste = this.grossistes[0]
                this.categorieByGrossiste(defaultGrossiste.id)
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
