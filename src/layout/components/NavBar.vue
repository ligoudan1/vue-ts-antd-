<template>
  <div class="lz-head">
    <el-menu
      class="el-menu-title"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" @click="titleHref('/test1')">{{ $t('home') }}</el-menu-item>
      <el-menu-item index="2">{{ $t('test1') }}</el-menu-item>
      <el-menu-item index="3">{{ $t('test2') }}</el-menu-item>
      <el-submenu index="2">
        <template slot="title">{{ $t('language') }}</template>
        <el-menu-item index="2-1" @click="changeLanguage('zh')">中文</el-menu-item>
        <el-menu-item index="2-2" @click="changeLanguage('en')">English</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class MainHeader extends Vue {
  // 国际化切换
  changeLanguage(type: string): void {
    // 此处做了国际化存储记录
    localStorage.setItem("locale", type);
    // 修改显示语言
    (this as any).$i18n.locale = type;
  }
  // 首页title的跳转
  titleHref(url: string) {
    this.$router.push({ path: url });
  }
}
</script>

<style lang="scss">
.el-menu-title {
  border-bottom: 0px !important;
}
</style>
