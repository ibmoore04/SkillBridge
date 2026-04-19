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
          <router-link to="/home" :class="isActive('/home') ? 'active-link' : ''">
            Home
          </router-link>

          <router-link v-if="currentUser" to="/dashboard" :class="isActive('/dashboard') ? 'active-link' : ''">
            Dashboard
          </router-link>

          <li>
            <router-link to="/home#courses" class="hover:text-orange-500">Courses</router-link>
          </li>
          <li>
            <router-link to="/home#about" class="hover:text-orange-500">About Us</router-link>
          </li>
          <li>
            <router-link to="/home#pricing" class="hover:text-orange-500">Pricing</router-link>
          </li>
          <li>
            <router-link to="/home#contact" class="hover:text-orange-500">Contact</router-link>
          </li>
        </ul>

        <!-- Right Section -->
        <div class="flex items-center gap-3">
          <!-- Desktop Auth -->
          <div class="hidden lg:flex items-center gap-4">
            <template v-if="currentUser">
              <div class="flex items-center gap-3">
                <!-- Avatar -->
                <div
                  class="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm">
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
                <button @click="handleLogout"
                  class="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md text-sm">
                  Logout
                </button>
              </div>
            </template>

            <template v-else>
              <router-link to="/signup" class="text-sm text-gray-700 hover:text-orange-500">
                Sign Up
              </router-link>

              <router-link to="/login"
                class="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md text-sm font-medium">
                Login
              </router-link>
            </template>
          </div>

          <!-- Mobile Right (User + Toggle) -->
          <div class="flex items-center gap-2 lg:hidden">
            <!-- User avatar -->
            <div v-if="currentUser"
              class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-semibold">
              {{ initials }}
            </div>

            <!-- Menu toggle -->
            <button @click="toggleMenu" class="relative w-8 h-8 flex items-center justify-center transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);">

              <!-- Top line -->
              <span class="absolute h-0.5 w-6 bg-gray-800 transition-all duration-300"
                :class="isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'"></span>

              <!-- Middle line -->
              <span class="absolute h-0.5 w-6 bg-gray-800 transition-all duration-300"
                :class="isOpen ? 'opacity-0' : 'opacity-100'"></span>

              <!-- Bottom line -->
              <span class="absolute h-0.5 w-6 bg-gray-800 transition-all duration-300"
                :class="isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'"></span>

            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <!-- Overlay -->
      <div v-if="isOpen" class="fixed inset-0 bg-black/40 z-40 lg:hidden" @click="isOpen = false"></div>

      <!-- Side Drawer -->
      <div
        class="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 lg:hidden"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
        <div class="p-5">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <span class="font-bold text-lg">Menu</span>

            <button @click="isOpen = false" class="text-xl">✕</button>
          </div>

          <!-- Links -->
          <ul class="flex flex-col gap-3 text-gray-800">
            <router-link to="/home" :class="isActive('/home') ? 'active-link' : ''">
              Home
            </router-link>

            <li v-if="currentUser">
              <router-link to="/dashboard" class="nav-link" @click="closeMenu">
                Dashboard
              </router-link>
            </li>

            <li>
              <router-link to="/home#courses" class="nav-link" @click="closeMenu">
                Courses
              </router-link>
            </li>

            <li>
              <router-link to="/home#about" class="nav-link" @click="closeMenu">
                About Us
              </router-link>
            </li>

            <li>
              <router-link to="/home#pricing" class="nav-link" @click="closeMenu">
                Pricing
              </router-link>
            </li>

            <li>
              <router-link to="/home#contact" class="nav-link" @click="closeMenu">
                Contact
              </router-link>
            </li>
          </ul>

          <!-- User -->
          <div class="mt-8 border-t pt-4 flex items-center gap-3" v-if="currentUser">
            <div class="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white">
              {{ initials }}
            </div>

            <div>
              <p class="font-medium">{{ currentUser.name }}</p>
              <p class="text-xs text-gray-500">{{ currentUser.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { getCurrentUser, logout } from "../../utils/auth.js";
import { useRoute } from "vue-router";

const route = useRoute();

const isActive = (path) => {
  return route.path === path;
};

const closeMenu = () => {
  isOpen.value = false;
};

const router = useRouter();
const isOpen = ref(false);

const currentUser = computed(() => getCurrentUser());

const initials = computed(() => {
  if (!currentUser.value?.name) return "";
  return currentUser.value.name
    .split(" ")
    .map((n) => n[0])
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

.nav-link {
  display: block;
  padding: 10px;
  border-radius: 8px;
  transition: 0.2s;
}

.active-link {
  color: #f97316;
  font-weight: 600;
}
</style>
