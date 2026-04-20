<template>
  <main class="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
    <div class="max-w-md w-full bg-white p-6 md:p-8 rounded-xl shadow border">

      <h2 class="text-xl md:text-2xl font-semibold text-gray-800 mb-1 md:mb-2">Login</h2>
      <p class="text-gray-500 mb-4 md:mb-6">Welcome back 👋</p>

      <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-5">

        <!-- Email -->
        <div>
          <label class="text-sm text-gray-600">Email</label>
          <input v-model="email" type="email"
            class="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none text-sm md:text-base" />
        </div>

        <!-- Password -->
        <div>
          <label class="text-sm text-gray-600">Password</label>

          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" v-model="password"
              class="w-full mt-1 px-4 py-2 border rounded-md pr-10 focus:ring-2 focus:ring-orange-400 outline-none text-sm md:text-base" />

            <button type="button" @click="togglePassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              👁
            </button>
          </div>
        </div>

        <!-- Remember Me -->
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 text-gray-600">
            <input type="checkbox" v-model="rememberMe" />
            Remember me
          </label>
        </div>

        <!-- Submit -->
        <button type="submit" :disabled="isLoading"
          class="w-full bg-brand text-white py-2 rounded-md hover:bg-brand/90 text-sm md:text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
          <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>

          <span>{{ isLoading ? "Logging in..." : "Login" }}</span>
        </button>

      </form>

      <p class="text-xs md:text-sm text-gray-500 mt-6 text-center">
        Don’t have an account?
        <router-link to="/signup" class="text-brand font-medium">
          Sign Up
        </router-link>
      </p>

    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { authenticate } from "../utils/auth.js";

const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);
const isLoading = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

/* =========================
   AUTO LOAD SESSION
========================= */
onMounted(() => {
  const session = localStorage.getItem("userSession");
  if (session) {
    router.push("/home");
  }

  const savedEmail = localStorage.getItem("rememberedEmail");
  if (savedEmail) {
    email.value = savedEmail;
    rememberMe.value = true;
  }
});

/* =========================
   LOGIN
========================= */
const handleLogin = async () => {
  if (!email.value.trim() || !password.value) {
    return Swal.fire("Missing Fields", "Please fill in all fields", "info");
  }

  isLoading.value = true;

  // small delay so spinner is visible (feels real)
  await new Promise((resolve) => setTimeout(resolve, 800));

  const user = authenticate(email.value.trim(), password.value);

  isLoading.value = false;

  if (!user) {
    return Swal.fire("Login Failed", "Incorrect email or password", "error");
  }

  localStorage.setItem("userSession", JSON.stringify(user));

  if (rememberMe.value) {
    localStorage.setItem("rememberedEmail", email.value.trim());
  } else {
    localStorage.removeItem("rememberedEmail");
  }

  Swal.fire({
    title: "Welcome 🎉",
    text: `Hello ${user.name || "User"}`,
    icon: "success",
  });

  router.push("/home");
};
</script>