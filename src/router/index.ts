import Vue from 'vue'
import VueRouter from 'vue-router'
import { test1 } from './modules/test1'
Vue.use(VueRouter)

/**
 * 解决console报错
 */
const routerPush: any = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: any): any {
  return routerPush.call(this, location).catch((error: any) => error)
}

export const constRoutes: Array<any> = [
  {
    path: '/login',
    component: () => import('@/views/common/login.vue'),
    hidden: true
  }
]

export const MainRouter: Array<any> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/layout/components/AppMain.vue'), // 只有顶部布局
    children: [
      {
        path: '/demo',
        name: 'demo',
        component: () => import('@/views/demo/test.vue'),
        icon: 'none'
      },
      test1
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

// export const asyncRoutes: Array<any> = [
//   {
//     path: '/',
//     name: 'home',
//     component: () => import('@/layout/components/AppMain.vue'), // 只有顶部布局
//     children: [

//     ]
//   }
// ]
// export const asyncRoutes: Array<any> = [
//   {
//     path: '/',
//     name: '/',
//     component: layout,
//     children: [
//       {
//         path: '/demo',
//         name: 'test1',
//         component: routerMain,
//         icon: 'user',
//         children: [{
//           path: '/demo/test',
//           name: 'test2',
//           component: () => import('@/views/demo/test.vue'),
//           icon: 'none'
//         }
//         ]
//       }
//     ],
//     beforeEnter: (to: any, from: any, next: any) => {
//       const token: string | null = localStorage.getItem('token')
//       if (token) {
//         next()
//       } else {
//         next({ path: '/login' })
//       }
//     }
//   }
// ]

const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: (): any => ({ y: 0 }),
  routes: constRoutes.concat(MainRouter)
})

export default router
