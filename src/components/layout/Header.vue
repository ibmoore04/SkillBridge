<template>
  <header class="w-full">

    <!-- Top Banner -->
    <div class="bg-brand text-white text-xs md:text-sm text-center py-4 px-3 my-2 mx-4 rounded-md">
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
            <router-link
              to="/home"
              :class="isActive('/home') ? 'active-link' : ''"
            >
              Home
            </router-link>
          </li>

          <li v-if="currentUser">
            <router-link
              to="/dashboard"
              :class="isActive('/dashboard') ? 'active-link' : ''"
            >
              Dashboard
            </router-link>
          </li>

          <li><a href="#courses" class="hover:text-brand">Courses</a></li>
          <li><a href="#about" class="hover:text-brand">About Us</a></li>
          <li><a href="#pricing" class="hover:text-brand">Pricing</a></li>
          <li><a href="#contact" class="hover:text-brand">Contact</a></li>

        </ul>

        <!-- Right Section -->
        <div class="flex items-center gap-3">

          <!-- Desktop Auth -->
          <div class="hidden lg:flex items-center gap-4">

            <template v-if="currentUser">
              <div class="flex items-center gap-3">

                <!-- Avatar -->
                <div class="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-white font-semibold text-sm">
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
                  class="ml-2 bg-brand hover:bg-brand/90 text-white px-3 py-1.5 rounded-md text-sm"
                >
                  Logout
                </button>

              </div>
            </template>

            <template v-else>
              <router-link to="/signup" class="text-sm text-gray-700 hover:text-brand">
                Sign Up
              </router-link>

              <router-link
                to="/login"
                class="bg-brand text-white px-5 py-2 rounded-md text-sm font-medium"
              >
                Login
              </router-link>
            </template>

          </div>

          <!-- Mobile Right -->
          <div class="flex items-center gap-2 lg:hidden">

            <!-- User -->
            <div v-if="currentUser"
              class="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white text-sm font-semibold">
              {{ initials }}
            </div>

            <!-- Toggle -->
            <button
              @click="toggleMenu"
              class="relative w-8 h-8 flex items-center justify-center"
            >

              <span class="absolute h-0.5 w-6 bg-gray-800 transition-all duration-300"
                :class="isOpen ? 'rotate-45' : '-translate-y-2'"></span>

              <span class="absolute h-0.5 w-6 bg-gray-800 transition-all duration-300"
                :class="isOpen ? 'opacity-0' : 'opacity-100'"></span>

              <span class="absolute h-0.5 w-6 bg-gray-800 transition-all duration-300"
                :class="isOpen ? '-rotate-45' : 'translate-y-2'"></span>

            </button>

          </div>
        </div>
      </div>

      <!-- Overlay -->
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/40 z-40 lg:hidden"
        @click="closeMenu"
      ></div>

      <!-- Side Drawer -->
      <div
        class="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 lg:hidden"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="p-5">

          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <span class="font-bold text-lg">Menu</span>
            <button @click="closeMenu" class="text-xl">✕</button>
          </div>

          <!-- Links -->
          <ul class="flex flex-col gap-3 text-gray-800">

            <li>
              <router-link to="/home" @click="closeMenu" :class="isActive('/home') ? 'active-link' : ''">
                Home
              </router-link>
            </li>

            <li v-if="currentUser">
              <router-link to="/dashboard" @click="closeMenu">
                Dashboard
              </router-link>
            </li>

            <li><a href="#courses" @click="closeMenu">Courses</a></li>
            <li><a href="#about" @click="closeMenu">About Us</a></li>
            <li><a href="#pricing" @click="closeMenu">Pricing</a></li>
            <li><a href="#contact" @click="closeMenu">Contact</a></li>

          </ul>

          <!-- User -->
          <div v-if="currentUser" class="mt-8 border-t pt-4 flex items-center gap-3">

            <div class="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-white">
              {{ initials }}
            </div>

            <div>
              <p class="font-medium">{{ currentUser.name }}</p>
              <p class="text-xs text-gray-500">{{ currentUser.email }}</p>
            </div>

          </div>

          <!-- Logout (FIXED) -->
          <div v-if="currentUser" class="mt-4">
            <button
              @click="handleLogout"
              class="w-full bg-brand text-white py-2 rounded-md"
            >
              Logout
            </button>
          </div>

        </div>
      </div>

    </nav>
  </header>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getCurrentUser, logout } from "../../utils/auth.js";

const router = useRouter();
const route = useRoute();

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

const isActive = (path) => route.path === path;

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>

<style scoped>
.active-link {
  color: #ff9500;
  font-weight: 600;
}
</style>