import Dashboard from '@/views/admin/Dashboard'
import Grossiste from '@/views/admin/Grossiste'
import Commande from '@/views/admin/Commande'
import Partenaire from '@/views/admin/Partenaire'

export default {
    dashboard: {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    grossiste: {
        path: '/admin/grossiste',
        name: 'Grossiste',
        component: Grossiste
    },
    commande: {
        path: '/admin/commande',
        name: 'Commande',
        component: Commande
    },
    partenaire: {
        path: '/admin/partenaire',
        name: 'Partenaire',
        component: Partenaire
    }
}