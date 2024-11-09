// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "posts",
        redirect: "/",
      },
      {
        path: "posts/:id",
        name: "PostDetails",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/PostDetails.vue"),
      },
      {
        path: "posts/:id/update",
        name: "updatePost",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/UpdatePost.vue"),
      },
      {
        path: "add-post",
        name: "add-post",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/addPost.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
