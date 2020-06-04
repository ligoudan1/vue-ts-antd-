<template>
  <!-- 插入到全局布局组件的内容区插槽中 -->
  <global-layout>
    <!-- 标签页tabs -->
    <router-main :page-list="pageList" />
  </global-layout>
</template>

<script lang='ts'>
import GlobalLayout from './main.vue'
import routerMain from './router-main.vue'
import { Component, Vue, Provide, Watch } from 'vue-property-decorator'

@Component({
  components: {
    GlobalLayout,
    routerMain
  }
})
export default class MainTab extends Vue {
  // name: "MenuView";
  // data
  @Provide() pageList: Array<any> = [];
  @Provide() linkList: Array<any> = [];
  @Provide() activePage = '';
  @Provide() menuVisible = false;
  @Provide() menuItemList: Array<any> = [
    { key: '1', icon: 'arrow-left', text: '关闭左侧' },
    { key: '2', icon: 'arrow-right', text: '关闭右侧' },
    { key: '3', icon: 'close', text: '关闭其它' }
  ];

  // computed
  get multipage(): any {
    return this.$store.state.Setting.multipage
  }

  // watch
  @Watch('$route')
  getRoute(newRoute: any):void {
    if (newRoute.name === '/') {
      return
    }
    this.activePage = newRoute.fullPath
    if (!this.multipage) {
      this.linkList = [newRoute.fullPath]
      this.pageList = [newRoute]
    } else if (this.linkList.indexOf(newRoute.fullPath) < 0) {
      this.linkList.push(newRoute.fullPath)
      this.pageList.push(newRoute)
    }
  }

  @Watch('activePage')
  getactivePage(key: string):void {
    this.$router.push(key)
  }

  @Watch('multipage')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getmultipage(newVal: any):void {
    if (!newVal) {
      this.linkList = [this.$route.fullPath]
      this.pageList = [this.$route]
    }
  }

  created(): void {
    if (this.$route.name === '/') {
      return
    }
    this.pageList.push(this.$route)
    this.linkList.push(this.$route.fullPath)
    this.activePage = this.$route.fullPath
  }

  changePage(key: any):void {
    this.activePage = key
  }

  editPage(key: any, action: any):void {
    (this as any)[action](key)
  }

  remove(key: any):void {
    if (this.pageList.length === 1) {
      this.$router.push('/')
    }
    this.pageList = this.pageList.filter(item => item.fullPath !== key)
    let index = this.linkList.indexOf(key)
    this.linkList = this.linkList.filter(item => item !== key)
    index = index >= this.linkList.length ? this.linkList.length - 1 : index
    this.activePage = this.linkList[index]
  }

  onContextmenu(e: any):void {
    const pagekey = this.getPageKey(e.target)
    if (pagekey !== null) {
      e.preventDefault()
      this.menuVisible = true
    }
  }

  /**
   * 由于ant-design-vue组件库的TabPane组件暂不支持自定义监听器，无法直接获取到右键target所在标签页的 pagekey 。故增加此方法用于
   * 查询右键target所在标签页的标识 pagekey ，以用于自定义右键菜单的事件处理。
   * 注：TabPane组件支持自定义监听器后可去除该方法并重构 ‘自定义右键菜单的事件处理’
   * @param target 查询开始目标
   * @param count 查询层级深度 （查找层级最多不超过3层，超过3层深度直接返回 null）
   * @returns {String}
   */
  getPageKey(target?: any, depth?: any): any {
    depth = depth || 0
    if (depth > 2) {
      return null
    }
    let pageKey = target.getAttribute('pagekey')
    pageKey =
      pageKey ||
      (target.previousElementSibling
        ? target.previousElementSibling.getAttribute('pagekey')
        : null)
    return (
      pageKey ||
      (target.firstElementChild
        ? this.getPageKey(target.firstElementChild, ++depth)
        : null)
    )
  }

  onMenuSelect(key: any, target: any):void {
    const pageKey = this.getPageKey(target)
    switch (key) {
      case '1':
        this.closeLeft(pageKey)
        break
      case '2':
        this.closeRight(pageKey)
        break
      case '3':
        this.closeOthers(pageKey)
        break
      default:
        break
    }
  }

  closeOthers(pageKey: any):void {
    const index = this.linkList.indexOf(pageKey)
    this.linkList = this.linkList.slice(index, index + 1)
    this.pageList = this.pageList.slice(index, index + 1)
    this.activePage = this.linkList[0]
  }

  closeLeft(pageKey: any):void {
    const index = this.linkList.indexOf(pageKey)
    this.linkList = this.linkList.slice(index)
    this.pageList = this.pageList.slice(index)
    if (this.linkList.indexOf(this.activePage) < 0) {
      this.activePage = this.linkList[0]
    }
  }

  closeRight(pageKey: any):void {
    const index = this.linkList.indexOf(pageKey)
    this.linkList = this.linkList.slice(0, index + 1)
    this.pageList = this.pageList.slice(0, index + 1)
    if (this.linkList.indexOf((this as any).activePage < 0)) {
      this.activePage = this.linkList[this.linkList.length - 1]
    }
  }
}
</script>

<style scoped>
</style>
