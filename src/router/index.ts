import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/common/login.vue';
import mainTab from "@/views/layout/main-tab.vue"
import routerMain from "@/views/layout/router-main.vue"
Vue.use(VueRouter)

const routerPush: any = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: any): any {
  return routerPush.call(this, location).catch((error: any) => error)
}


const routes: Array<any> = [
  {
    path: '/login',
    name: 'login',
    component: login,
    invisible: true
  },
  {
    path: '/',
    name: '/',
    component: mainTab,
    children: [
      {
        path: '/demo',
        name: 'test1',
        component: routerMain,
        icon: 'user',
        children: [{
          path: '/demo/test',
          name: 'test2',
          component: () => import('@/views/demo/test.vue'),
          icon: 'none'
        }
        ]
      }
    ],
    beforeEnter: (to: any, from: any, next: any) => {
      let token: string | null = localStorage.getItem('token');
      if (token) {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: (): any => ({ y: 0 }),
  routes
})

export default router
