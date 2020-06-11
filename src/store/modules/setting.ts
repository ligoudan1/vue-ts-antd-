import { Module } from 'vuex'
import { RootState, SettingState } from '../type'
const namespaced = true
const state: SettingState = {
  multipage: true,
  includeView: []
}
const mutations = {
  setMultipage(state: SettingState, multipage: boolean) {
    state.multipage = multipage
  }
}
export const Setting: Module<SettingState, RootState> = {
  namespaced,
  state,
  mutations
}
