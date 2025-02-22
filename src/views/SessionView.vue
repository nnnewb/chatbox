<script setup lang="ts">
import { useSession, type Session } from "@/stores/session";
import { ChatLineRound, Plus } from "@element-plus/icons-vue";
import { ElAside, ElContainer, ElIcon, ElMain, ElMenu, ElMenuItem, type MenuItemRegistered } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const sessions = useSession();
const session_list = sessions.list_session();

function activeIndex(): string {
  for (const sess of session_list) {
    if (router.currentRoute.value.path === `/session/chat/${sess.id}`) {
      return `${sess.id}`;
    }
  }
  return "0";
}

function handleCreateSession(item: MenuItemRegistered) {
  const sess = sessions.create_session("untitled");
  router.push(`/chat/${sess.id}`);
}
</script>

<template>
  <el-container>
    <el-aside>
      <el-menu mode="vertical" :default-active="activeIndex()" router>
        <el-menu-item index="0" @click="handleCreateSession">
          <el-icon>
            <Plus />
          </el-icon>
          新会话
        </el-menu-item>
        <el-menu-item v-for="sess in session_list" :route="`/session/chat/${sess.id}`" :index="`${sess.id}`">
          <el-icon>
            <ChatLineRound />
          </el-icon>
          {{ sess.name }}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped>
.el-main,
.el-aside {
  height: 100%;
}
.el-menu--vertical {
  height: 100%;
}
</style>
