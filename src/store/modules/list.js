const state = {
    dblData: {},
    clickData:{},
    selections:[],
  }
  const mutations = {
    SET_DATA: (state, data) => {
      state.dblData = data
    },
    SET_CLICKDATA: (state, data) => {
      state.clickData = data
    },
    SET_SELECTIONS: (state, data) => {
      state.selections = data
    },
  }
  
  const actions = {
    setData({commit}, data) {
      commit('SET_DATA', data)
    },
    setClickData({commit}, data) {
      commit('SET_CLICKDATA', data)
    },
    setSelections({commit}, data) {
      commit('SET_SELECTIONS', data)
    },
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  