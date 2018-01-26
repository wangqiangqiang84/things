import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import gateway from './modules/gateway'
import device from './modules/device'
import data from './modules/data'
import settings from './modules/settings'
import account from './modules/switchAccount'
import home from './modules/home'
Vue.use(Vuex)
const state = {
  userId: '',
  username: '',
  customerId: '',
  password: '',
  newUsername: ''
}
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    gateway,
    device,
    data,
    settings,
    account,
    home
  }
})



