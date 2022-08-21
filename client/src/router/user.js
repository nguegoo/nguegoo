import Registration from '@/views/user/Registration'
import Login from '@/views/user/Login'
export default {
    registration: {
        path: '/user/registration',
        name: 'Registration',
        component: Registration
    },
    login: {
        path: '/user/login',
        name: 'Login',
        component: Login
    },
    pannier: {
        path: '/user/pannier',
        name: 'PannierView',
        component: () => import('@/views/user/PannierView')
    }
}