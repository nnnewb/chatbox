<script setup lang="ts">
import { ElContainer, ElHeader, ElMain, ElAside } from "element-plus";
import { RouterLink, RouterView } from "vue-router";
import AsideNav from "./components/AsideNav.vue";
import HeaderBar from "./components/HeaderBar.vue";
</script>

<template>
  <el-container class="fullpage">
    <aside-nav />
    <el-container direction="vertical">
      <header-bar title="ChatBox" />
      <RouterView />
    </el-container>
  </el-container>
</template>

<style scoped>
.fullpage {
  height: 100%;
}
</style>
