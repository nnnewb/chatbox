<script setup lang="ts">
import SingleMessage from "@/components/SingleMessage.vue";

defineProps<{
  messages: {
    role: "user" | "assistant";
    content: string;
  }[];
}>();
</script>

<template>
  <div class="message-container">
    <single-message v-for="m in messages" :role="m.role" :content="m.content" />
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
