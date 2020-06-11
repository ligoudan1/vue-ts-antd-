<template>
  <div v-if="!item.hidden">
    <template v-if="!item.children">
      <App-link :to="item.path">
        <el-menu-item>
          <item :icon="item.meta.icon" :title="item.meta.title"></item>
        </el-menu-item>
      </App-link>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AppLink from "./Link.vue";
import item from "./item.vue";
@Component({
  components: { AppLink, item }
})
export default class SidebarItem extends Vue {
  @Prop({
    required: true,
    type: Object
  })
  private item!: any;

  created() {
    console.log(this.item);
  }
}
</script>

<style lang="scss">
</style>