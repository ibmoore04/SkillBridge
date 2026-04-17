import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import SignUp from "../views/SignUp.vue";
import Home from "../views/Home.vue";

const isLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

const routes = [
{
    path: "/",
    redirect: "/login",
  },
  {
  path: "/login",
  name: "Login",
  component: () => import("../views/LoginPage.vue"),
  meta: { hideLayout: true }
},
{
  path: "/signup",
  name: "SignUp",
  component: () => import("../views/SignUp.vue")
},
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    beforeEnter: (to, from) => {
      if (localStorage.getItem("isLoggedIn") === "true") {
        return true;
      } else {
        return "/login";
      }
    },
  },  
];

const router = createRouter({
  history: createWebHistory(),
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



export default router;