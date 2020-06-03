import Vue from 'vue'
import SvgIcon from '@/components/global/SvgIcon/index.vue'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = (require as any).context('./svg', false, /\.svg$/)
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
requireAll(req)
