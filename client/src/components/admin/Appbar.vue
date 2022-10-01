<template>
<div style="margin: 0px!important;padding: 0px!important;">
    <v-app-bar class="elevation-0" app dense flat elevation-on-scroll color="bg-color2" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase" @click="navigateTo('/admin/home')" style="cursor: pointer;">
            Administration
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
            <template v-slot:activator="{on, attrs }">
                <v-badge bordered bottom color="pink" dot offset-x="27" offset-y="14">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-bell</v-icon>
                    </v-btn>
                </v-badge>
            </template>
            <span>Nouvelle notification</span>
        </v-tooltip>
        <v-btn icon>
            <v-icon>mdi-account-circle</v-icon>
        </v-btn>
    </v-app-bar>
    <v-navigation-drawer color="amin-bg-color" app v-model="drawer">
        <template v-slot:prepend>
            <v-list-item two-line>
                <v-list-item-avatar>
                    <v-icon class="grey--text">mdi-apps</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="white--text">Gérer</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>
        <v-divider></v-divider>
        <v-list>
            <v-list-item-group v-model="selectLink" color="white">
              <v-list-item @click="navigateTo('/grossiste/dashboard')" class="white--text">
                    <v-list-item-icon>
                        <v-icon class="white--text">mdi-view-compact</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title class="white--text">Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="navigateTo('/grossiste/product')" class="white--text">
                    <v-list-item-icon>
                        <v-icon class="white--text">mdi-food</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title class="white--text">Produits</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="navigateTo('/grossiste/vente')" class="white--text">
                    <v-list-item-icon>
                        <v-icon class="white--text">mdi-currency-eur</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title class="white--text">Ventes</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="navigateTo('/grossiste/client')" class="white--text">
                    <v-list-item-icon>
                        <v-icon class="white--text">mdi-account-group</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title class="white--text">Clients</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-row justify="center">
                    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                        <!-- contenu de la boîte à messagerie -->
                        <v-card>
                            <v-toolbar dark color="primary">
                                <v-btn icon dark @click="showChatBox">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                                <v-toolbar-title>Messaérie</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-items>
                                    <v-btn icon dark>
                                        <v-icon>mdi-account</v-icon>
                                    </v-btn>
                                </v-toolbar-items>
                            </v-toolbar>
                            <v-container justify="center">
                                <v-row justify="center">
                                    <v-col cols="12" md="6">
                                        <v-card class="pa-3">
                                            <div class="coversations-list" v-if="conversationList">
                                                <h4 class="text-center font-weight-thin">Conversations</h4>
                                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher" single-line hide-details></v-text-field>
                                                <div class="mt-5" v-for="client in [1, 2, 3, 4, 5]" :key="client">
                                                    <div class="d-flex justify-space-between" style="cursor: pointer;">
                                                        <h4 class="mt-3 font-weight-thin">Username</h4>
                                                        <v-card-subtitle class="text-right">04/02/2021</v-card-subtitle>
                                                    </div>
                                                    <v-card-text style="margin-top: -20px; padding: 0;">
                                                        Lorem ipsum dolor, sit amet consectetur adipisicing.
                                                        <v-btn icon small  style="float: right">
                                                            <v-icon class="red--text">mdi-delete</v-icon>
                                                        </v-btn>
                                                    </v-card-text>
                                                    <v-divider class="mt-2"></v-divider>
                                                </div>
                                            </div>
                                            <div class="conversation-box" v-if="messageBox">
                                                <v-toolbar dense flat>
                                                    <v-toolbar-title>Username</v-toolbar-title>
                                                    <v-spacer></v-spacer>
                                                    <v-btn icon @click="showConversationList">
                                                        <v-icon>mdi-apps</v-icon>
                                                    </v-btn>
                                                </v-toolbar>
                                                <v-divider></v-divider>
                                                <div class="message mt-4" v-for="(message, i) in messages" :key="i">
                                                    <span v-if="message.username == 'Vous'">Vous</span>
                                                    <v-card-text class="indigo lighten-4 rounded pa-2">
                                                        {{ message.message }}
                                                    </v-card-text>
                                                    <v-card-subtitle class="text-right" style="margin-top: -14px">{{ message.date }}</v-card-subtitle>
                                                </div>
                                                <div class="written-box">
                                                    <v-textarea label="Votre message" auto-grow outlined rows="1" row-height="15" class="mb-3"></v-textarea>
                                                    <v-btn class="text-capitalize indigo white--text">
                                                        envoyer
                                                    </v-btn>
                                                </div>
                                            </div>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>
export default {
    watch: {
        group() {
            this.drawer = false
        },
        selectedItem(value) {
            this.selectLink = value
        }
    },
    data() {
        return {
            drawer: true,
            group: null,
            dialog: false,
            search: null,
            conversationList: true,
            messageBox: false,
            messages: [{
                    username: 'Client',
                    message: `
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, omnis.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, omnis.
          `,
                    date: '04/02/2021'
                },
                {
                    username: 'Vous',
                    message: `
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, omnis.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, omnis.
          `,
                    date: '04/02/2021'
                },
                {
                    username: 'Client',
                    message: `
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, omnis.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, omnis.
          `,
                    date: '04/02/2021'
                }
            ],
            selectLink: this.selectedItem
        }
    },
    props: ['selectedItem'],
    methods: {
        navigateTo(route) {
            this.$router.push({
                path: route
            })
        },
        showChatBox() {
            this.dialog = !this.dialog
        },
    },
    name: 'Appbar'
}
</script>

<style>
.bg-back-1 {
    background-color: rgba(0, 0, 0, 0.75);
}

.text-color {
    color: #4568DC !important;
}

.bg-color2 {
    background-color: #4568DC !important;
}

.text-color1 {
    color: #B06AB3 !important;
}

.bg-color1 {
    background: #B06AB3 !important;
}

.amin-bg-color {
    background: #4568DC;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #B06AB3, #4568DC);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #B06AB3, #4568DC);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>
