<template>
  <component :is="type" v-bind="linkProps()">
    <slot />
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { isExternal } from "@/utils/validate";
@Component
export default class Alink extends Vue {
  // 传过来的to
  @Prop({
    type: String,
    required: true
  })
  private to!: any;

  get isExternal(): boolean {
    return isExternal(this.to);
  }

  get type(): string {
    if (this.isExternal) {
      return "a";
    } else {
      return "router-link";
    }
  }

  linkProps() {
    if (this.isExternal) {
      return {
        href: this.to,
        target: "_blank",
        rel: "noopener"
      };
    } else {
      return {
        to: this.to
      };
    }
  }
  
}
</script>
