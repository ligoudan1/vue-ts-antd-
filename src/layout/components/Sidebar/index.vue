<template>
  <div class="sideBarView">
    <Sidebar />
    <keep-alive>
      <router-view style="width:100%"/>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Sidebar from './Sidebar.vue'
@Component({
  components: {
    Sidebar
  }
})
export default class IndexSiderBar extends Vue {}
</script>

<style lang="scss">
.sideBarView {
  display: flex;
  height: 100%;
}
</style>
