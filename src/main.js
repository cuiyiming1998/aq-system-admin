import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import axios from 'axios'
import './plugins/element.js'

// 使用Vuex
Vue.use(Vuex);

//设置axios代理
axios.defaults.baseURL = '/api';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
