<template>
  <transition name="fade">
    <router-view />
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class App extends Vue {}
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
