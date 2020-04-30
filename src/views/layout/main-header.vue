<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="() => (collapsed = !collapsed)"
    />
  </a-layout-header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class MainHeader extends Vue {
  get collapsed() {
    return this.$store.state.Common.collapsed;
  }
  set collapsed(val) {
    this.$store.commit("Common/updateCollapsed", val);
  }
}
</script>

<style lang="scss">
</style>