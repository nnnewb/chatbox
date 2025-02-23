<script setup lang="ts">
import { ElButton } from "element-plus";
import { Refresh, RefreshLeft } from "@element-plus/icons-vue";
import { marked, type Message } from "@/lib";
defineProps<{ message: Message }>();

const parse = marked.parse;
</script>

<template>
  <div :class="['message', message.role]">
    <h1 class="assistant-message-header" v-if="message.role === 'assistant'">
      Assistant <small>{{ message.done ? message.model : "..." }}</small>
    </h1>
    <div
      class="message-body"
      v-html="parse(message.content.replace(/<think>/, '<blockquote>').replace(/<\/think>/, '</blockquote>'))"
    ></div>
    <p class="assistant-message-actions" v-if="message.role === 'assistant' && message.done">
      <el-text type="info"
        >耗时 {{ (message.total_duration * 1e-9).toPrecision(5) }} 秒，共 {{ message.eval_count }} token， 推理速度
        {{ (message.eval_count / (message.total_duration * 1e-9)).toPrecision(5) }} tokens/s 。</el-text
      >
      <el-button link :icon="RefreshLeft">撤回</el-button>
      <el-button link :icon="Refresh">重新生成</el-button>
    </p>
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

.assistant-message-actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
}

.assistant-message-header {
  margin-bottom: 10px;
}

.assistant-message-header small {
  font-size: 0.8em;
  color: #888;
  font-weight: 500;
}
</style>

<style>
.message-body blockquote {
  padding: 10px;
  background-color: #e0e0e0;
  border: #aaa solid 1px;
  border-radius: 6px;
  color: #555;
  margin-bottom: 1em;
}
</style>
