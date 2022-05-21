export default {


    isAuthenticated ($store, $router) {
        if (!$store.state.userIsLogged) {
            $router.push({ path: '/user/login' })
            return 
        }
    }
}