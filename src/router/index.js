import { createRouter, createWebHistory } from "vue-router";
import NewsList from "@/modules/News/components/DemoNewsList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: { name: "News List" },
    children: [
      {
        path: "/",
        name: "News List",
        component: NewsList,
      },
      {
        path: ":id",
        name: "News",
        component: () => import("@/modules/News/components/DemoNews.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
