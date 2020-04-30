<template>
  <a-config-provider :locale="locale">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </a-config-provider>
</template>

<script lang="ts">
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {
  public locale: any = zhCN;
}
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}
</style>
