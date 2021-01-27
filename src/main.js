import Vue from 'vue'
import App from './App.vue'
import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
var Paginate = require('vuejs-paginate')
Vue.component('paginate', Paginate)

Vue.use(VueIziToast)
Vue.use(Vuelidate)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
