import { Module } from 'vuex'; // Module校验规则
import { RootState, CommonState } from '../type';
const namespaced: boolean = true;
const state: CommonState = {
    collapsed: false
}
const mutations = {
    updateCollapsed(state: CommonState, val: boolean): void {
        state.collapsed = val;
    }
}
export const Common: Module<CommonState, RootState> = {
    namespaced,
    state,
    mutations
}