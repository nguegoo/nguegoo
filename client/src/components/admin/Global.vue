<template>
  <v-app>
    <appbar :selectedItem="selectedItem"/>
      <slot>
        pas de contenu
      </slot>
  </v-app>
</template>

<script>
import Appbar from './Appbar.vue'
export default {
  created () {
    const token = localStorage.getItem('token')
    console.log(token)
    if(token == null) {
      this.navigateTo('/grossiste/authentication')
    }else {
      this.$store.dispatch('setToken', localStorage.getItem('token'))
      this.$store.dispatch('setUser', JSON.parse(localStorage.getItem('user')))
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push({ path: route })
    }
  },
  props: ['selectedItem'],
  components: { Appbar },
  name: 'Global'
}
</script>

<style scoped>

</style>
