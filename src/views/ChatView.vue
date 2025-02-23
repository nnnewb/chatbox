<script setup lang="ts">
import MessageContainer from "@/components/MessageContainer.vue";
import type { Message } from "@/lib";
import { useConfigStore } from "@/stores/config";
import { Promotion } from "@element-plus/icons-vue";
import { ElButton, ElInput, ElText } from "element-plus";
import { Ollama } from "ollama";
import { reactive, ref } from "vue";

const messages = reactive<Message[]>([]);
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
    messages.push({ id: cfg.incr(), role: "user", created_at: new Date(), content: user_input.value });

    const resp = await o.chat({
      messages: messages,
      model: cfg.model,
      stream: true,
    });

    const m = reactive<Message>({ id: cfg.incr(), done: false, role: "assistant", content: "" });
    const pos = messages.push(m);
    for await (const chunk of resp) {
      m.content = m.content + chunk.message.content;
      if (chunk.done) {
        messages[pos - 1] = {
          id: m.id,
          role: "assistant",
          done: true,
          content: m.content,
          created_at: chunk.created_at,
          model: chunk.model,
          done_reason: chunk.done_reason,
          total_duration: chunk.total_duration,
          load_duration: chunk.load_duration,
          eval_count: chunk.eval_count,
          eval_duration: chunk.eval_duration,
          prompt_eval_count: chunk.prompt_eval_count,
          prompt_eval_duration: chunk.prompt_eval_duration,
        };
      }
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
