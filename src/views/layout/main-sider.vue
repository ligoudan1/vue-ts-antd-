<template>
  <a-layout-sider :trigger="null" collapsible v-model="collapsed">
    <div class="logo" />
    <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']" :defaultOpenKeys="['2']">
      <template v-for="item in menu">
        <a-menu-item v-if="!item.children" :key="item.path" @click="gotoRouteHandle(item.name)">
          <a-icon :type="item.icon" v-if="item.icon != 'none'" />
          <span>{{ item.name }}</span>
        </a-menu-item>
        <sub-menu v-else :menuInfo="item" :key="item.path" />
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { Menu } from "ant-design-vue";
import { Component, Vue } from "vue-property-decorator";
interface MenuFormat {
  template: string;
  name: string;
  isSubMenu: boolean;
  props?: any;
  methods?: any;
}
interface router extends Vue {
  $router: any;
}
const SubMenu: MenuFormat = {
  template: `
      <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon :type="menuInfo.icon" /><span>{{ menuInfo.name }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.path" @click="gotoRouteHandle(item.name)">
            <a-icon :type="item.icon" v-if="item.icon != 'none'"/>
            <span>{{ item.name }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: "SubMenu",
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...(Menu as any).SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    gotoRouteHandle(name: any) {
      (this as router).$router.push({ name });
    }
  }
};
@Component({
  components: {
    "sub-menu": SubMenu
  }
})
export default class MainSider extends Vue {
  public menu: any[] = [];

  get collapsed() {
    return this.$store.state.Common.collapsed;
  }

  created(): void {
    let index = (this as any).$router.options.routes.findIndex(
      (d: any) => d.path == "/"
    );
    this.menu = (this as any).$router.options.routes[index].children;
  }

  // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
  gotoRouteHandle(name: any) {
    this.$router.push({ name });
  }
}
</script>

<style lang="scss">
</style>