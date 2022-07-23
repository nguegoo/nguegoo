import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: null,
        userIsLogged: false,
        clientParams: {
            grossisteSelected: null,
            categorieSelected: null
        }
    },
    mutations: {
        setToken (state, token) {
            state.token = token
            if (state.token) {
                state.userIsLogged = true
            }else {
                state.userIsLogged = false
            }
        },
        setUser (state, user) {
            state.user = user
        },
        logOut(state) {
            state.token = null
            state.user = null
            state.userIsLogged = false
        },
        setClientParams(state, params) {
            state.clientParams = params
        }
    },
    getters: {
        getUserAuthencationState (state) {
            return state.userIsLogged
        },
        getUser(state) {
            return state.user
        },
        getToken(state) {
            return state.token
        },
        getClientParams(state) {
            return state.clientParams
        }
    },
    actions: {
        setToken ({ commit }, token) {
            commit('setToken', token)
        },
        setUser ({ commit }, user) {
            commit('setUser', user)
        },
        logOut({commit}) {
            commit('logOut')
        },
        setClientParams({ commit }, params) {
            commit('setClientParams', params)
        }
    }
})