<template>
  <el-container style="height:100%">
    <el-header>
      <main-header />
    </el-header>
    <el-container style="min-height:870px">
      <el-aside width="200px" :style="{backgroundColor:'#545c64'}">
        <main-sider />
      </el-aside>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
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