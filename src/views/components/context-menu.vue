<template>
  <!-- 标签栏右键菜单 -->
  <a-menu
    :style="style"
    class="contextmenu"
    v-show="visible"
    @click="handleClick"
    :selectedKeys="selectedKeys"
  >
    <a-menu-item :key="item.key" v-for="item in itemList">
      <a-icon role="menuitemicon" v-if="item.icon" :type="item.icon" />
      {{item.text}}
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Contextmenu"
})
export default class ContextMenu extends Vue {
  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  public visible!: boolean;

  @Prop({
    type: Array,
    required: true
  })
  public itemList!: Array<any>;

  public left: number = 0;
  public top: number = 0;
  public target: any = null;
  public selectedKeys: Array<any> = [];

  get style() {
    return {
      left: this.left + "px",
      top: this.top + "px"
    };
  }

  created(): void {
    window.addEventListener("mousedown", e => this.closeMenu(e));
    window.addEventListener("contextmenu", e => this.setPosition(e));
  }

  closeMenu(e: any) {
    if (
      ["menuitemicon", "menuitem"].indexOf(e.target.getAttribute("role")) < 0
    ) {
      this.$emit("update:visible", false);
    }
  }
  setPosition(e: any) {
    this.left = e.clientX;
    this.top = e.clientY;
    this.target = e.target;
  }
  handleClick({ key }: any) {
    this.$emit("select", key, this.target);
    this.$emit("update:visible", false);
  }
}
</script>

<style lang="scss" scoped>
.contextmenu {
  position: fixed;
  z-index: 9;
  border: 1px solid #9e9e9e;
  border-radius: 4px;
  box-shadow: 2px 2px 10px #aaaaaa !important;
}
</style>
