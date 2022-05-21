import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import product from './product'
import user from './user'
import grossiste from './grossiste'
import admin from './admin'
import superadmin from './superadmin'
import partneradmin from './partneradmin'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },

  // product
  product.showList,
  product.cart,
  product.detailProduct,
  product.allDetail,
  // User
  user.registration,
  user.login,

  // Admin
  admin.dashboard,
  admin.grossiste,
  admin.commande,
  admin.partenaire,
  // grossiste
  grossiste.dashboard,
  grossiste.product,
  grossiste.commande,
  grossiste.vente,
  grossiste.category,
  grossiste.protectResources,

  // Super admin
  superadmin.index,
  superadmin.clientDetail,
  superadmin.partenaires,
  superadmin.partenaireDetail,
  superadmin.subCategory,
  superadmin.category,
  superadmin.livraisons,
  
  // Partner admin
  partneradmin.partnerAdminHome,
  partneradmin.livraisonDetail

]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  saveScrollPosition: true,
  routes: routes
})

export default router
