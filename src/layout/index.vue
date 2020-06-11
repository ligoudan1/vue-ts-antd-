<template>
  <div>
    <NavBar />
    <AppMain />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AppMain, NavBar } from '@/layout/components'
@Component({
  components: {
    AppMain,
    NavBar
  }
})
export default class IndexMain extends Vue {}
</script>

<style lang="scss">
</style>
