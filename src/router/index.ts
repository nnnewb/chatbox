import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: () => import("../views/WelcomeView.vue"),
    },
    {
      path: "/session",
      name: "session",
      component: () => import("../views/SessionView.vue"),
      children: [
        {
          path: "/session/chat/:id",
          name: "chat",
          component: () => import("../views/ChatView.vue"),
        },
      ],
    },
  ],
});

export default router;
