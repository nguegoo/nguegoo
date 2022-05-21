<template>
  <div>
    <v-navigation-drawer
      permanent
      left
      fixed
      disabled-resize-watcher
      style="top:8.5%;"
      class="d-none d-sm-none d-md-block d-lg-block"
      width="230px"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-icon class="grey--text">mdi-apps</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Ressources</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            @click="navigateTo('/superadmin/index')"
            class="white--text"
          >
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-check-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Clients</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            @click="navigateTo('/superadmin/partenaires')"
            class="white--text"
          >
            <v-list-item-icon>
              <v-icon>mdi-account-convert</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Partenaires</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            @click="navigateTo('/superadmin/livraisons')"
            class="white--text"
          >
            <v-list-item-icon>
              <v-icon>mdi-bus-double-decker</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Livraisons</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-row justify="center">
            <v-dialog
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-list-item
                  v-bind="attrs"
                  v-on="on"
                  class="ml-3"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-chat-outline</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                   <v-list-item-title>Messagérie</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <!-- contenu de la boîte à messagerie -->
              <v-card>
                <v-toolbar
                  dark
                  color="green"
                >
                  <v-btn
                    icon
                    dark
                    @click="dialog = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Messaérie</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                   <v-btn icon daqrk>
                    <v-icon>mdi-account</v-icon>
                   </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-container justify="center">
                  <v-row justify="center">
                    <v-col cols="12" md="6">
                      <v-card class="pa-3">
                        <div class="coversations-list"
                          v-if="conversationList"
                        >
                          <h4 class="text-center font-weight-thin">Conversations</h4>
                          <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Rechercher"
                            single-line
                            hide-details
                          ></v-text-field>
                          <div class="mt-5"
                            v-for="client in [1, 2, 3, 4, 5]"
                            :key="client"
                          >
                            <div class="d-flex justify-space-between"
                              style="cursor: pointer;"  @click="chatWith">
                              <h4 class="mt-3 font-weight-thin">Username</h4>
                              <v-card-subtitle class="text-right">04/02/2021</v-card-subtitle>
                            </div>
                            <v-card-text style="margin-top: -20px; padding: 0;">
                              Lorem ipsum dolor, sit amet consectetur adipisicing.
                              <v-btn icon small
                                @click="deleteMsg"
                                style="float: right"
                              >
                                <v-icon class="red--text">mdi-delete</v-icon>
                              </v-btn>
                            </v-card-text>
                            <v-divider class="mt-2"></v-divider>
                          </div>
                        </div>
                        <div class="conversation-box"
                          v-if="messageBox"
                        >
                          <v-toolbar dense flat>
                            <v-toolbar-title>Username</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon
                              @click="showConversationList"
                            >
                              <v-icon>mdi-apps</v-icon>
                            </v-btn>
                          </v-toolbar>
                          <v-divider></v-divider>
                          <div class="message mt-4"
                            v-for="(message, i) in messages"
                            :key="i"
                          >
                            <span v-if="message.username == 'Vous'">Vous</span>
                            <v-card-text class="indigo lighten-4 rounded pa-2">
                              {{ message.message }}
                            </v-card-text>
                            <v-card-subtitle class="text-right"
                              style="margin-top: -14px"
                            >{{ message.date }}</v-card-subtitle>
                          </div>
                          <div class="written-box">
                              <v-textarea
                                label="Votre message"
                                auto-grow
                                outlined
                                rows="1"
                                row-height="15"
                                class="mb-3"
                              ></v-textarea>
                              <v-btn class="text-capitalize green white--text">
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
  methods: {
    navigateTo (route) {
      this.$router.push({ path: route})
    },
    chatWith () {
      this.conversationList = false
      this.messageBox = true
    },
    showConversationList () {
      this.conversationList = true
      this.messageBox = false
    },
    deleteMsg () {
      alert("delete msg")
    }
  },
  data () {
    return {
      selectedItem: '',
      dialog: false,
      conversationList: true,
      messageBox: false,
      search: null,
      messages: [
        {
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
      ]
    }
  },
  name: 'SideBar'
}
</script>

<style scoped></style>
