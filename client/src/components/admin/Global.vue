<template>
  <div>
    <appbar />
    <side-bar />
    <slot>
      No slot content
    </slot>
    <v-row>
      <v-col cols="12" md="9" lg="10" offeset="0" offset-md="3" offset-lg="2">
        <Footer />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Appbar from './Appbar.vue'
import SideBar from './SideBar.vue'
import Footer from '@/components/mainComponents/Footer'
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
  components: { Appbar, SideBar, Footer },
  name: 'Global'
}
</script>

<style scoped>

</style>
