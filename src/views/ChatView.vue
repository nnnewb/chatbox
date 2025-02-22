<script setup lang="ts">
import MessageContainer from "@/components/MessageContainer.vue";
import { useConfigStore } from "@/stores/config";
import { Promotion } from "@element-plus/icons-vue";
import { ElButton, ElInput, ElText } from "element-plus";
import { Ollama } from "ollama";
import { reactive, ref } from "vue";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const messages = reactive<Message[]>([
  {
    role: "user",
    content: "你好",
  },
]);
const user_input = ref("");
const cfg = useConfigStore();
const o = new Ollama({ host: cfg.host });
const pending = ref(false);

async function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    console.log("fuck");

    e.preventDefault();
    await handleSend();
  }
}

async function handleSend() {
  pending.value = true;
  try {
    messages.push({ role: "user", content: user_input.value });

    const resp = await o.chat({
      messages: messages,
      model: cfg.model,
      stream: true,
    });

    const m = reactive<Message>({ role: "assistant", content: "" });
    messages.push(m);
    for await (const chunk of resp) {
      m.content = m.content + chunk.message.content;
      console.log(m.content);
    }

    user_input.value = "";
  } finally {
    pending.value = false;
  }
}
</script>

<template>
  <div class="view">
    <el-text size="default">开始你的表演 :)</el-text>
    <div class="dialogue">
      <message-container :messages="messages" />
    </div>
    <div class="input">
      <el-input
        type="textarea"
        resize="none"
        :rows="5"
        v-model="user_input"
        @keypress="handleKeyDown"
        :disabled="pending"
      />
      <el-button type="primary" :icon="Promotion" :disabled="pending" />
    </div>
    <div class="footer">
      <el-text type="info">按enter键发送，按shift+enter换行。</el-text>
    </div>
  </div>
</template>

<style scoped>
.view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.dialogue {
  flex: 1;
}

.input {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 12px;
}

.input .el-input {
  flex: 1;
}

.message {
  border: #aef solid 1px;
  border-radius: 8px;
}
</style>
