<template>
  <section class="app-main">
    <NavBar />
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive :include="includeView">
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import NavBar from './NavBar.vue'
@Component({
  components: {
    NavBar
  }
})
export default class AppMain extends Vue {
  // key: any = this.$route.path;
  // computed
  get includeView(): any {
    return this.$store.state.Setting.includeView
  }
}
</script>

<style lang="scss">
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>
