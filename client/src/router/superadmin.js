import Index from '@/views/superadmin/Index'
import ClientDetail from '@/views/superadmin/ClientDetail'
import Partenaires from '@/views/superadmin/Partenaires'
import PartenaireDetail from '@/views/superadmin/PartenaireDetail'
import Livraisons from '@/views/superadmin/Livraisons'
import SubCategory from '@/views/superadmin/SubCategory'
import Category from '@/views/superadmin/Category'
export default {
    index: {
        path: '/superadmin/index',
        name: 'Index',
        component: Index
    },
    clientDetail: {
        path: '/superadmin/client-detail/:id',
        name: 'ClientDetail',
        component: ClientDetail
    },
    partenaires: {
        path: '/superadmin/partenaires',
        name: 'Partenaires',
        component: Partenaires
    },
    partenaireDetail: {
        path: '/superadmin/partenaire-detail/:id',
        name: 'PartenaireDetail',
        component: PartenaireDetail
    },
    livraisons: {
        path: '/superadmin/livraisons',
        name: 'Livraisons',
        component: Livraisons
    },
    subCategory: {
        path: '/superadmin/product/subcategory',
        name: 'Product',
        component: SubCategory
    },
    category: {
        path: '/superadmin/product/category',
        name: 'Category',
        component: Category
    }
}