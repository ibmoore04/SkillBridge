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
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
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
    return to.hash
      ? { el: to.hash, behavior: "smooth" }
      : { top: 0 };
  },
});

/* =========================
   AUTH GUARD (IMPROVED)
========================= */
router.beforeEach((to, from, next) => {
  const loggedIn = isLoggedIn();

  // protect private pages
  if (to.meta.requiresAuth && !loggedIn) {
    return next("/login");
  }

  // prevent logged-in users from seeing login/signup
  if ((to.path === "/login" || to.path === "/signup") && loggedIn) {
    return next("/home");
  }

  next();
});

export default router;