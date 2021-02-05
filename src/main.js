import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueIziToast from 'vue-izitoast';
var Paginate = require('vuejs-paginate')
import Vuelidate from 'vuelidate'
import 'izitoast/dist/css/iziToast.min.css';
var vueCookie = require('vue-cookie')


Vue.component('paginate', Paginate)
Vue.use(vueCookie )

Vue.use(VueIziToast)
Vue.use(Vuelidate)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
