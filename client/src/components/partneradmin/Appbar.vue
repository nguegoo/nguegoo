<template>
  <v-main>
    <v-app-bar class="elevation-0" fixed dense flat elevation-on-scroll>
      <v-app-bar-nav-icon
       @click.stop="drawer = !drawer"
       class="d-block d-md-none"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase"
        @click="navigateTo('/admin/home')"
        style="cursor: pointer;"
      >
        Administration
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{on, attrs }">
          <v-badge
            bordered
            bottom
            color="pink"
            dot
            offset-x="27"
            offset-y="14"
          >
            <v-btn icon
              v-bind="attrs"
              v-on="on"
            >
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
    <v-navigation-drawer v-model="drawer" fixed temporary class="mt-10" flat
     color="indigo"
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-main>
</template>

<script>
export default {
  watch: {
    group () {
      this.drawer = false
    }
  },
  data () {
    return {
      drawer: false,
      group: null
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push({ path: route })
    }
  },
  name: 'Appbar'
}
</script>

<style>
.bg-back-1 {
  background-color: rgba(0, 0, 0, 0.75);
}
</style>
