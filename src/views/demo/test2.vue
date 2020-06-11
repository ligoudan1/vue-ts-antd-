<template>
  <div>
    <button @click="clickEvent">
      clickme2
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class test2 extends Vue {
  public test = 'test';
  created() {
    console.log(this.test)
  }

  public clickEvent(): void {
    console.log('====================================')
    console.log(this)
    console.log('====================================')
  }
}
</script>

<style lang="scss">
</style>
