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
        name: '测试',
        component: routerMain,
        icon: 'user',
        children: [{
          path: '/demo/test',
          name: '测试',
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  }
]

const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: (): any => ({ y: 0 }),
  routes
})

export default router
