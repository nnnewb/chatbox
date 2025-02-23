<script setup lang="ts">
import SingleMessage from "@/components/SingleMessage.vue";
import type { Message } from "@/lib";

defineProps<{ messages: Message[] }>();
</script>

<template>
  <div class="message-container">
    <single-message v-for="m in messages" :message="m" />
  </div>
</template>

<style scoped>
/* 消息气泡样式 */
.message-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
}
</style>
