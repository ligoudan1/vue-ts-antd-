<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location" />
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template slot="title">
          分组一
        </template>
        <el-menu-item index="1-1">
          选项1
        </el-menu-item>
        <el-menu-item index="1-2">
          选项2
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">
          选项3
        </el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">
          选项4
        </template>
        <el-menu-item index="1-4-1">
          选项1
        </el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu" />
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item
      index="3"
      disabled
    >
      <i class="el-icon-document" />
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting" />
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
interface MenuFormat {
  template: string
  name: string
  isSubMenu: boolean
  props?: any
  methods?: any
}
interface router extends Vue {
  $router: any
}
@Component
export default class MainSider extends Vue {
  public menu: any[] = [];

  created(): void {
    const index = (this as any).$router.options.routes.findIndex(
      (d: any) => d.path === '/'
    )
    this.menu = (this as any).$router.options.routes[index].children
    console.log(this.menu)
  }

  handleOpen() {
    console.log(111)
  }

  handleClose() {
    console.log(111)
  }

  // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
  gotoRouteHandle(name: string): any {
    this.$router.push({ name })
  }
}
</script>

<style lang="scss">
</style>
