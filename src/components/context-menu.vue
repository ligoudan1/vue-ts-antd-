<template>
  <!-- 标签栏右键菜单 -->
  <a-menu
    v-show="visible"
    :style="style"
    class="contextmenu"
    :selected-keys="selectedKeys"
    @click="handleClick"
  >
    <a-menu-item
      v-for="item in itemList"
      :key="item.key"
    >
      <a-icon
        v-if="item.icon"
        role="menuitemicon"
        :type="item.icon"
      />
      {{ item.text }}
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'Contextmenu'
})
export default class ContextMenu extends Vue {
  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  private visible!: boolean;

  @Prop({
    type: Array,
    required: true
  })
  private itemList!: Array<any>;

  public left = 0;
  public top = 0;
  public target: any = null;
  public selectedKeys: Array<any> = [];

  get style():any {
    return {
      left: this.left + 'px',
      top: this.top + 'px'
    }
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
