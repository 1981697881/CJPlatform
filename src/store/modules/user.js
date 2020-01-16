import { login, logout, getInfo,changePassword } from '@/api/user'
import { getToken, setToken, removeToken, setUserName, setPassword } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken('rx'),
  name: '',
  avatar: '',
  username: '',
  password: '',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_PASSWORD: (state, password) => {
    state.password = password
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log(response)
          const { data } = response
          /* commit('SET_TOKEN', data.fid)
           setToken(data.fid)*/
          commit('SET_USERNAME', username)
          commit('SET_PASSWORD', password)
          setUserName(username)
          setPassword(password)
          resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改密码
  changePassword({ commit }, info) {
    return new Promise((resolve, reject) => {
      changePassword(info).then(response => {
          commit('SET_TOKEN', '')
          removeToken()
          resetRouter()
          resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log(state.token)
       logout({fid:state.token}).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })

      /* commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
      localStorage.removeItem('routes')
      router */
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  // add token
  addToken({ commit },state) {
    return new Promise(resolve => {
      commit('SET_TOKEN', state)
      setToken(state)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

