import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
const state = {
  isShowLogin: true,
  isShowRegister: false,
  isShowResetting: false
}
export default {
  state,
  mutations,
  actions,
  getters
}
