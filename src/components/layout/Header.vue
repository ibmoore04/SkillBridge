<template>
  <header class="w-full">

    <!-- Top Banner -->
    <div class="bg-orange-500 text-white text-xs md:text-sm text-center py-4 px-3 my-2 mx-4 rounded-md">
      Free Courses ✨ Sale Ends Soon, Get It Now →
    </div>

    <!-- Navbar -->
    <nav class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <!-- Left: Logo -->
        <div class="flex items-center gap-2">
          <img src="/images/image.png" alt="Logo" class="w-9 h-9 object-contain" />
          <span class="text-xl font-bold text-gray-800">EduTech</span>
        </div>

        <!-- Desktop Nav -->
        <ul class="hidden lg:flex items-center gap-6 text-sm text-gray-800">
          <li>
            <router-link to="/home" class="bg-gray-100 px-4 py-2 rounded-md font-medium">
              Home
            </router-link>
          </li>

          <li v-if="currentUser">
            <router-link to="/dashboard" class="hover:text-orange-500">
              Dashboard
            </router-link>
          </li>

          <li><router-link to="/home#courses" class="hover:text-orange-500">Courses</router-link></li>
          <li><router-link to="/home#about" class="hover:text-orange-500">About Us</router-link></li>
          <li><router-link to="/home#pricing" class="hover:text-orange-500">Pricing</router-link></li>
          <li><router-link to="/home#contact" class="hover:text-orange-500">Contact</router-link></li>
        </ul>

        <!-- Right Section -->
        <div class="flex items-center gap-3">

          <!-- Desktop Auth -->
          <div class="hidden lg:flex items-center gap-4">

            <template v-if="currentUser">
              <div class="flex items-center gap-3">

                <!-- Avatar -->
                <div class="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm">
                  {{ initials }}
                </div>

                <!-- Name + Email -->
                <div class="hidden sm:block leading-tight">
                  <p class="text-sm font-semibold text-gray-800">
                    {{ currentUser.name }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ currentUser.email }}
                  </p>
                </div>

                <!-- Logout -->
                <button
                  @click="handleLogout"
                  class="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md text-sm"
                >
                  Logout
                </button>
              </div>
            </template>

            <template v-else>
              <router-link to="/signup" class="text-sm text-gray-700 hover:text-orange-500">
                Sign Up
              </router-link>

              <router-link
                to="/login"
                class="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md text-sm font-medium"
              >
                Login
              </router-link>
            </template>

          </div>

          <!-- Mobile Right (User + Toggle) -->
          <div class="flex items-center gap-2 lg:hidden">

            <!-- User avatar -->
            <div
              v-if="currentUser"
              class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-semibold"
            >
              {{ initials }}
            </div>

            <!-- Menu toggle -->
            <button @click="toggleMenu">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  v-if="!isOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="fade">
        <div v-if="isOpen" class="lg:hidden px-4 pb-5">

          <ul class="flex flex-col gap-4 text-gray-800 text-base mb-5">
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/home#courses">Courses</router-link></li>
            <li><router-link to="/home#about">About Us</router-link></li>
            <li><router-link to="/home#pricing">Pricing</router-link></li>
            <li><router-link to="/home#contact">Contact</router-link></li>
          </ul>

          <!-- Mobile user -->
          <div class="flex items-center gap-3">

            <div
              v-if="currentUser"
              class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm"
            >
              {{ initials }}
            </div>

            <div v-if="currentUser">
              <p class="font-medium text-gray-900">{{ currentUser.name }}</p>
              <p class="text-xs text-gray-500">{{ currentUser.email }}</p>
            </div>

            <template v-else>
              <router-link to="/signup">Sign Up</router-link>
              <router-link to="/login">Login</router-link>
            </template>

          </div>

        </div>
      </transition>

    </nav>
  </header>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { getCurrentUser, logout } from "../../utils/auth.js";

const router = useRouter();
const isOpen = ref(false);

const currentUser = computed(() => getCurrentUser());

const initials = computed(() => {
  if (!currentUser.value?.name) return "";
  return currentUser.value.name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();
});

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>