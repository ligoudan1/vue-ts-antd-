export const test1 = {
  path: '/test1',
  name: 'test1',
  component: () => import('@/layout/components/Sidebar/index.vue'), // 只有顶部布局
  children: [
    {
      path: '/test1/demo',
      name: 'test1Demo',
      component: () => import('@/views/demo/test.vue'),
      meta: {
        icon: 'none',
        title: '测试'
      }
    },
    {
      path: '/test1/demo2',
      name: 'test1Demo2',
      component: () => import('@/views/demo/test2.vue'),
      meta: {
        icon: 'none',
        title: '测试2'
      }
    }
  ]
}