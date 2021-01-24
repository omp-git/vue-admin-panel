import Vue from 'vue'
import Vuex from 'vuex'
import globalAxios from './axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null
  },
  mutations: {
    // save token and expiration in vuex state
    authUser (state, authData) {
      state.idToken = authData.token
      state.userId = authData.userId
      localStorage.setItem('_uid', authData.userId)
      localStorage.setItem('_token', authData.token)
      localStorage.setItem('_expires', authData.expiresIn)    
      router.push('/dashboard').catch(()=>{})
    },
    // clear token and expiration in vuex state
    clearAuthUser (state) {
      state.idToken = null
      state.userId = null
      localStorage.setItem('_uid', null)
      localStorage.setItem('_token', null)
      localStorage.setItem('_expires', null) 
      router.push('/signin').catch(()=>{})
    }
  },
  actions: {
    login({commit, dispatch},authData) {
      return new Promise((resolve, reject) => {
        globalAxios.post('auth/vue-login', {
          mobile: authData.mobile,
          password: authData.password
        }) 
        .then(response => {
          const data = response.data
          if(data.status) {
            console.log('login: ', data)
            commit('authUser', {
              token: data.access_token,
              expiresIn: data.expires_in,
              userId: data.u_id
            })
            if(data.expires_in) {
              const period = data.expires_in - utcNow()
              dispatch('setLogoutTime', period)
            }
          }
          resolve(response);
        })
          .catch((error) => {
            console.log('err:', error)
            reject(error);
          })
      })
    },

    // try to login after refresh page
    tryAutoLogin({commit, dispatch}) {
      const token = localStorage.getItem('_token')
      if(typeof(token) == 'undefined' || token === null || token === 'null') {
        return
      }

      const expirationDate = localStorage.getItem('_expires');
      const now = utcNow()
      if(now >= expirationDate) {
        return
      }

      const userId = localStorage.getItem('_uid')
      commit('authUser', {
        token: token,
        expiresIn: expirationDate,
        userId: userId
      })
      const period = expirationDate - now
      dispatch('setLogoutTime', period)
    },
    logout({commit}) {
      commit('clearAuthUser')
    },
    setLogoutTime({dispatch}, expirationTime) {
      console.log('timeout: ', expirationTime*1000)
      setTimeout(() => {
        dispatch('logout')
      }, expirationTime * 1000) 
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.idToken !== null
    },
    token(state) {
      return state.idToken;
    },
    uId(state) {
      return state.userId;
    }
  }
})

function utcNow() {
  const now = new Date()
  return Math.floor(now.getTime() / 1000)   
}