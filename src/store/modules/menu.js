import { getRouter } from '@/api/wy/menu'
import { StaticRouterMap } from '@/router'

const state = {
    routes: []
}

const mutations = {
    SET_ROUTER: (state, routes) => {
        state.routes = routes
    }
}

const actions = {
    setRouterList({commit},routerList){
        // 进行路由拼接并存储
        commit('SET_ROUTER', StaticRouterMap.concat(routerList)) 
    },
    fetchMenuWY({ commit }, userId) {
        return new Promise((resolve, reject) => {
            getRouter(userId).then(res => {
                let routes = res.data
                resolve(routes)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
