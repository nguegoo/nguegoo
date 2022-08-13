<template>
<v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
        <v-list>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img src="http://localhost:8080/images/person_1.jpg"></v-img>
                </v-list-item-avatar>
            </v-list-item>
            <v-list-item link>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        Admin username
                    </v-list-item-title>
                    <v-list-item-subtitle>admin@gmail.com</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-icon>mdi-menu-down</v-icon>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list nav dense>
            <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item v-for="(item, i) in items" :key="i" @click="navigateTo(item.link)">
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense color="light">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Administration</v-toolbar-title>
    </v-app-bar>

    <v-main style="margin: 0px!important; padding: 0px!important;">
        <v-container fluid>
            <slot>No slot content</Slot>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            drawer: null,
            selectedItem: 0,
            items: [{
                    text: 'Dashboard',
                    icon: 'mdi-view-dashboard',
                    link: '/admin/dashboard'
                },
                {
                    text: 'Grossistes',
                    icon: 'mdi-account-multiple',
                    link: '/admin/grossiste'
                },
                {
                    text: 'Commandes',
                    icon: 'mdi-cart',
                    link: '/admin/commande'
                },
                {
                    text: 'Partenaires',
                    icon: 'mdi-car',
                    link: '/admin/partenaire'
                },
                {
                    text: 'Rapport',
                    icon: 'mdi-history',
                    link: '/admin/historique'
                },
                {
                    text: 'Paramètres',
                    icon: 'mdi-application-settings',
                    link: '/admin/parametre'
                },
            ],
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push({
                path: route
            })
        }
    },
}
</script>
