import Product from '@/views/grossiste/Product'
import Commande from '@/views/grossiste/Commande'
import Vente from '@/views/grossiste/Vente'
import Category from '@/views/grossiste/Category'
import NoAccess from '@/components/admin/NoAccess'
import Dashboard from '@/views/grossiste/Dashboard'
import Magasin from '@/views/grossiste/Magasin'
import Authentication from '@/views/grossiste/Authentication'
export default {
  dashboard: {
    path: '/grossiste/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  product: {
    path: '/grossiste/product',
    name: 'Product',
    component: Product
  },
  commande: {
    path: '/grossiste/commandes',
    name: 'Commande',
    component: Commande
  },
  vente: {
    path: '/grossiste/vente',
    name: 'Vente',
    component: Vente
  },
  category: {
    path: '/grossiste/category',
    name: 'Category',
    component: Category
  },
  protectResources: {
    path: '/protection.user.resources/denied',
    name: 'NoAccess',
    component: NoAccess
  },
  magasin: {
    path: '/magasin',
    name: 'Magasin',
    component: Magasin
  },
  authentication: {
    path: '/grossiste/authentication',
    name: 'Authentication',
    component: Authentication
  },
  /**
   * Clients d'un grossiste
   */
  client: {
    path: '/grossiste/client',
    name: 'ClientView',
    component: () => import('@/views/grossiste/ClientView')
  }
}