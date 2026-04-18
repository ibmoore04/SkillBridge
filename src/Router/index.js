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

router.beforeEach((to, from, next) => {
  const loggedIn = isLoggedIn();

  // Protect /home route - require authentication
  if (to.meta.requiresAuth && !loggedIn) {
    console.log("Protected route - redirecting to login");
    next("/login");
    return;
  }

  // Redirect already logged-in users away from login/signup
  if ((to.path === "/login" || to.path === "/signup") && loggedIn) {
    console.log("Already logged in - redirecting to home");
    next("/home");
    return;
  }

  next();
});

export default router;
