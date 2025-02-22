<script setup lang="ts">
defineProps<{
  role: "assistant" | "user";
  content: string;
}>();
</script>

<template>
  <div :class="['message', role]">
    {{ content }}
  </div>
</template>

<style scoped>
.message {
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  word-wrap: break-word;
}

.message.assistant {
  background-color: #f1f1f1;
  align-self: flex-start;
}

.message.user {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
}
</style>
