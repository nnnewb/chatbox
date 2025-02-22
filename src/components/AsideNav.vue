<script setup lang="ts">
import { ElAside, ElMenu, ElMenuItem, ElIcon } from "element-plus";
import { ChatLineRound, House, Setting } from "@element-plus/icons-vue";
import { useRoute } from 'vue-router';
import type { Component } from "vue";

interface NavItem {
  label: string;
  icon: Component;
  route: string;
  index: string;
}

const route = useRoute();
const navItems: NavItem[] = [
  { label: '首页', icon: House, route: '/', index: '1' },
  { label: '会话', icon: ChatLineRound, route: '/session', index: '2' },
  { label: '设置', icon: Setting, route: '/setting', index: '3' },
];

const activeIndex = navItems.find(item => item.route === route.path)?.index || '1';
</script>

<template>
  <el-aside>
    <el-menu mode="vertical" router :default-active="activeIndex">
      <el-menu-item v-for="item in navItems" :key="item.index" :index="item.index" :route="item.route">
        <el-icon><component :is="item.icon" /></el-icon>
        {{ item.label }}
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.el-menu--vertical {
  height: 100%;
}
</style>