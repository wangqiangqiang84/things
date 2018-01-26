import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'
const state = {
  isShowInfo: true,
  isShowSafe: false,
  isShowBinding: false
}
export default {
  state,
  mutations,
  actions,
  getters
}
