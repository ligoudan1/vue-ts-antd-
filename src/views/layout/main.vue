<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <main-sider />
    <a-layout style="background:#fff">
      <main-header />
      <a-layout-content :style="{padding: '24px', background: '#fff', minHeight: '280px' }">
        <!-- <keep-alive>
          <router-view />
        </keep-alive>-->
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import mainSider from "./main-sider.vue";
import mainHeader from "./main-header.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    mainSider,
    mainHeader
  }
})
export default class Main extends Vue {}
</script>

<style lang="scss">
#components-layout-demo-custom-trigger {
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
</style>