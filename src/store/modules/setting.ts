import { Module } from 'vuex';
import { RootState, SettingState } from '../type';
const namespaced: boolean = true;
const state: SettingState = {
    multipage: true
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