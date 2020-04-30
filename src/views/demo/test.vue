<template>
  <div>
    <button @click="clickEvent">clickme</button>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class test extends Vue {
  public test: string = "test";
  created() {
    console.log(this.test);
  }
  public clickEvent(): void {
    console.log("====================================");
    console.log(this);
    console.log("====================================");
  }
}
</script>

<style lang="scss">
</style>