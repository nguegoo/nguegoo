import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import AOS from 'aos'
import 'aos/dist/aos.css'
import router from './router'
import store from '@/store/store'
import { sync } from 'vuex-router-sync'
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

const socketInstance = SocketIO.connect('http://localhost:8081')
Vue.use(new VueSocketIO({
  debug: true,
  connection: socketInstance
}))

Vue.config.productionTip = false
sync(store, router)

new Vue({
  vuetify,
  created() {
    AOS.init({ disable: 'phone' })
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
