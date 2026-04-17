<template>
  <main class="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
    <div class="max-w-md w-full bg-white p-6 md:p-8 rounded-xl shadow border">

      <h2 class="text-xl md:text-2xl font-semibold text-gray-800 mb-1 md:mb-2">Login</h2>
      <p class="text-gray-500 mb-4 md:mb-6">Welcome back 👋</p>

      <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-5">

        <!-- Email -->
        <div>
          <label class="text-sm text-gray-600">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none text-sm md:text-base"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="text-sm text-gray-600">Password</label>

          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="w-full mt-1 px-4 py-2 border rounded-md pr-10 focus:ring-2 focus:ring-orange-400 outline-none text-sm md:text-base"
            />

            <button
              type="button"
              @click="togglePassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              👁
            </button>
          </div>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 text-sm md:text-base"
        >
          Login
        </button>

      </form>

      <p class="text-xs md:text-sm text-gray-500 mt-6 text-center">
        Don’t have an account?
        <a href="/signup" class="text-orange-500">Sign Up</a>
      </p>

    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = () => {
  if (!email.value || !password.value) {
    return Swal.fire("Missing Fields", "Please fill in all fields", "info");
  }

  const savedUser = JSON.parse(localStorage.getItem("user") || "null");

  if (!savedUser) {
    return Swal.fire(
      "No Account",
      "Please sign up first before logging in.",
      "warning"
    );
  }

  if (
    email.value === savedUser.email &&
    password.value === savedUser.password
  ) {
    // IMPORTANT: set login state
    localStorage.setItem("isLoggedIn", "true");

    
    Swal.fire({
      title: "Welcome back 🎉",
      text: `Hello ${savedUser.name}`,
      icon: "success",
    });

    router.push("/home");
  } else {
    Swal.fire("Login Failed", "Incorrect email or password", "error");
  }
};
</script>