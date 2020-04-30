<template>
  <Page-index v-if="pageList&&pageList.length == 0" />
  <keep-alive v-else>
    <router-view />
  </keep-alive>
</template>

<script lang="ts">
import PageIndex from "../page-index.vue";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {
    PageIndex
  }
})
export default class RouterMain extends Vue {
  @Prop(Array)
  public pageList!: Array<any>;
}
</script>

<style lang="scss">
</style>