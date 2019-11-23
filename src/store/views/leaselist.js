const state = {
    dblData: {},
    clickData:{},
  }
  const mutations = {
    SET_DATA: (state, data) => {
      state.dblData = data
    },
    SET_CLICKDATA: (state, data) => {
      state.clickData = data
    },
  }
  
  const actions = {
    setData({commit}, data) {
      commit('SET_DATA', data)
    },
    setClickData({commit}, data) {
      commit('SET_CLICKDATA', data)
    },
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  