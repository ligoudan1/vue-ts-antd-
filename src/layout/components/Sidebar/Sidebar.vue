<template>
  <!-- :default-active="activeMenu" 默认选中
    :collapse="isCollapse" 是否折叠
    :background-color="variables.menuBg" 背景色
    :text-color="variables.menuText" 字体颜色
    :unique-opened="false" 是否只保持一个子菜单的展开
    :active-text-color="variables.menuActiveText" 当前激活菜单的文字颜色（仅支持 hex 格式）
  :collapse-transition="false" 是否开启折叠动画-->
  <!-- :default-active="activeMenu"
    :collapse="isCollapse"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :unique-opened="false"
    :active-text-color="variables.menuActiveText"
  :collapse-transition="false"-->
  <el-menu
    mode="vertical"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    class="sidebar"
  >
    <Sidebar-item v-for="route in menu" :key="route.path" :item="route" :base-path="route.path" />
  </el-menu>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SidebarItem from "./SidebarItem.vue";
@Component({
  components: {
    SidebarItem
  }
})
export default class IndexSiderBar extends Vue {
  menu!: any[];
  created(): void {
    console.log(this.$route.path);
    let index: any = undefined;
    let routerStr: any;
    index = (this as any).$router.options.routes.findIndex(
      (d: any) => d.path === "/"
    );
    if (toString.call(this.$route.path) === "[object String]") {
      // 如果为string类型,证明不在总目录下
      routerStr = this.$route.path;
    } else {
      const reg: any = new RegExp(/^\/.*?\//);
      routerStr = reg
        .exec(this.$route.path)[0]
        .substr(0, reg.exec(this.$route.path)[0].length - 1);
    }

    let routeIndex: number = (this as any).$router.options.routes[
      index
    ].children.findIndex((d: any) => d.path === routerStr);
    this.menu = (this as any).$router.options.routes[index].children[
      routeIndex
    ].children;
  }
}
</script>

<style lang="scss">
.sidebar {
  width: 200px;
  height: 100%;
}
</style>
