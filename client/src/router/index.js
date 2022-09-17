import { createRouter, createWebHistory, RouterView } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/boards/list",
      name: "boards-list",
      component: () => import("@/views/boards/BoardsList.vue"),
    },
    {
      path: "/board/:id",
      name: "board-details",
      component: () => import("@/views/boards/BoardDetails.vue"),
    },
  ],
});

export default router;
