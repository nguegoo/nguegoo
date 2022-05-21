import PartnerAdminHome from '@/views/partneradmin/PartnerAdminHome'
import LivraisonDetail from '@/views/partneradmin/LivraisonDetail'
export default {
  partnerAdminHome: {
    path: '/partneradmin/partner-admin-home',
    name: 'PartnerAdminHome',
    component: PartnerAdminHome
  },
  livraisonDetail: {
    path: '/partneradmin/livraision-detail/:id',
    name: 'LivraisonDetail',
    component: LivraisonDetail
  }
}