<template>
  <div>
    <Svg-icon icon-class="feiji"></Svg-icon>
    <div>{{'测试' | formatStr}}</div>
    <el-button @click="sendRequest">发送请求</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as HTTP from "@/api/test";
@Component
export default class PageIndex extends Vue {
  sendRequest() {
    HTTP.test();
  }
}
</script>

<style lang="scss">
</style>