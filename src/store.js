import Vue from 'vue'
import Vuex from 'vuex'
import globalAxios from './axios'
import router from './router'
import aes from 'crypto-js/aes'
import utf8 from 'crypto-js/enc-utf8'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    expiresIn: null
  },
  mutations: {
    // save token and expiration in vuex state
    authUser (state, authData) {
      state.idToken = authData.token
      state.userId = authData.userId
      state.expiresIn = authData.expiresIn
      
      saveToLocal({
        token: authData.token,
        userId: authData.userId,
        expiresIn: authData.expiresIn,
      })
      router.push('/dashboard').catch(()=>{})
    },
    // clear token and expiration in vuex state
    clearAuthUser (state) {
      state.idToken = null
      state.userId = null
      state.expiresIn = null
      deleteLocal()
      router.push('/signin').catch(()=>{})
    }
  },
  actions: {
    login({commit, dispatch}, authData) {
      return new Promise((resolve, reject) => {
        globalAxios.post('auth/login', {
          mobile: authData.mobile.toString(),
          password: authData.password
        }) 
        .then(response => {
          const data = response.data
          if(response.status === 200) {
            commit('authUser', {
              token: data.access_token,
              expiresIn: data.expires_in,
              userId: data.user.id
            })
            if(data.expires_in) {
              const period = data.expires_in - utcNow()
              dispatch('setLogoutTime', period)
            }
            resolve(response)
          }
        })
          .catch((error) => reject(error))
      })
    },

    // try to login after refresh page
    tryAutoLogin({commit, dispatch}) {
      const info = loadLocalData()
      if(!info) { return }

      const token = info._token
      if(typeof(token) == 'undefined' || token === null || token === 'null') {
        return
      }

      const expirationDate = info._exp;
      const now = utcNow()
      if(now >= expirationDate) {
        return
      }

      const userId = info._uid
      commit('authUser', {
        token: token,
        expiresIn: expirationDate,
        userId: userId
      })
      const period = expirationDate - now
      dispatch('setLogoutTime', period)
    },
    logout({commit}) {
      globalAxios.post('auth/logout', {
        token: this.getters.token
      }) 
      .then(response => {
        if(response.status === 200) {
          commit('clearAuthUser')
          console.log('user logged out!')
        }
      })
      .catch((error) => {
        console.log('err:', error)
      })
    },
    setLogoutTime({commit}, expirationTime) {
      setTimeout(() => {
        commit('clearAuthUser')
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
    },
    expiresIn(state) {
      return state.expiresIn;
    }
  }
})

function utcNow() {
  const now = new Date()
  return Math.floor(now.getTime() / 1000)   
}

function saveToLocal(data) {
  let info = { _exp: data.expiresIn, _token: data.token, _uid: data.userId}
  var cipher = aes.encrypt(JSON.stringify(info), process.env.VUE_APP_KEY_AES)
  localStorage.setItem('vue_user', cipher)
  return true;
}

function loadLocalData() {
  try {
    const raw = localStorage.getItem('vue_user')
    var bytes = aes.decrypt(raw.toString(), process.env.VUE_APP_KEY_AES);
    var obj = JSON.parse(bytes.toString(utf8))
  }
  catch {
    return false;
  }
  if (('_exp' in obj) && ('_token' in obj) && ('_uid' in obj))
    return obj;
  return false;
}
function deleteLocal() { 
  localStorage.removeItem('vue_user')
  return true;
}