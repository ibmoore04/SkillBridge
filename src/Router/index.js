import { createRouter, createWebHashHistory } from "vue-router";
import { isLoggedIn } from "../utils/auth.js";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginPage.vue"),
    meta: { hideLayout: true },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/SignUp.vue"),
    meta: { hideLayout: true },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,

  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    return "/login";
  }

  if ((to.path === "/login" || to.path === "/signup") && isLoggedIn()) {
    return "/home";
  }
});

export default router;
