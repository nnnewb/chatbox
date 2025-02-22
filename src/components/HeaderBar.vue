<script setup lang="ts">
import { ElHeader, ElIcon } from "element-plus";
import { ChatLineRound } from "@element-plus/icons-vue";
defineProps<{
  title: string;
}>();
</script>

<template>
  <el-header>
    <h1>{{ title }}</h1>
  </el-header>
</template>

<style scoped>
.el-header {
  background-color: #409eff;
  color: white;
  text-align: left;
  line-height: 60px;
}

h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}
</style>
