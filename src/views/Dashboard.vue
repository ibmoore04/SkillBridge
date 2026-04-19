<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header with animated gradient -->
      <div class="mb-12 text-center md:text-left animate-[fadeInDown_0.6s_ease-out]">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 backdrop-blur-sm border border-orange-200 mb-4">
          <div class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
          <span class="text-xs font-medium text-orange-700">Live Dashboard</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-orange-400 bg-clip-text text-transparent mb-3">
          Learning Dashboard
        </h1>
        <p class="text-gray-600 text-lg">Track your learning progress and manage your courses</p>
      </div>

      <!-- Loading State -->
      <div v-if="courseStore.isLoading" class="flex justify-center py-20">
        <div class="relative">
          <div class="w-20 h-20 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p class="absolute mt-28 text-gray-600 font-medium">Loading your courses...</p>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Stats Cards with premium styling -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div class="group animate-[slideUp_0.5s_ease-out] animate-delay-0">
            <div class="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-lg transition-all duration-500 hover:shadow-xl hover:border-orange-200">
              <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-2xl"></div>
              <div class="relative p-6">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-4xl">📚</span>
                  <div class="px-3 py-1 rounded-full bg-orange-50 border border-orange-200">
                    <span class="text-xs font-semibold text-orange-600">Total</span>
                  </div>
                </div>
                <h3 class="text-3xl font-bold text-gray-900 mb-1">{{ courseStore.totalCourses }}</h3>
                <p class="text-gray-500 text-sm">Active Courses</p>
                <div class="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full w-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transform origin-left transition-transform duration-1000" style="transform: scaleX(1)"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="group animate-[slideUp_0.5s_ease-out] animate-delay-100">
            <div class="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-lg transition-all duration-500 hover:shadow-xl hover:border-orange-200">
              <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/5 to-transparent rounded-full blur-2xl"></div>
              <div class="relative p-6">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-4xl">✅</span>
                  <div class="px-3 py-1 rounded-full bg-green-50 border border-green-200">
                    <span class="text-xs font-semibold text-green-600">Completed</span>
                  </div>
                </div>
                <h3 class="text-3xl font-bold text-gray-900 mb-1">{{ courseStore.completedCourses }}</h3>
                <p class="text-gray-500 text-sm">Courses Finished</p>
                <div class="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full w-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transform origin-left transition-transform duration-1000" :style="{ transform: `scaleX(${courseStore.totalCourses ? courseStore.completedCourses / courseStore.totalCourses : 0})` }"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="group animate-[slideUp_0.5s_ease-out] animate-delay-200">
            <div class="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-lg transition-all duration-500 hover:shadow-xl hover:border-orange-200">
              <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-2xl"></div>
              <div class="relative p-6">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-4xl">📈</span>
                  <div class="px-3 py-1 rounded-full bg-orange-50 border border-orange-200">
                    <span class="text-xs font-semibold text-orange-600">Progress</span>
                  </div>
                </div>
                <h3 class="text-3xl font-bold text-gray-900 mb-1">{{ courseStore.totalProgress }}%</h3>
                <p class="text-gray-500 text-sm">Overall Progress</p>
                <div class="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-1000" :style="{ width: `${courseStore.totalProgress}%` }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Course Sections with glassmorphism -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recently Viewed -->
          <div class="group animate-[fadeIn_0.5s_ease-out] animate-delay-300">
            <div class="rounded-2xl bg-white border border-gray-100 shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-orange-200">
              <div class="relative">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
                <div class="p-6">
                  <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                        <span class="text-xl">🕐</span>
                      </div>
                      <div>
                        <h2 class="text-xl font-bold text-gray-900">Recently Viewed</h2>
                        <p class="text-gray-500 text-sm">Your recent activity</p>
                      </div>
                    </div>
                    <div class="px-3 py-1 rounded-full bg-orange-50 border border-orange-200">
                      <span class="text-xs font-medium text-orange-600">Live</span>
                    </div>
                  </div>
                  <div class="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                    <CourseList
                      :courses="courseStore.recentlyViewedCourses"
                      :showProgress="true"
                      :showBookmark="true"
                      emptyMessage="No recently viewed courses"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bookmarked Courses -->
          <div class="group animate-[fadeIn_0.5s_ease-out] animate-delay-400">
            <div class="rounded-2xl bg-white border border-gray-100 shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-orange-200">
              <div class="relative">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
                <div class="p-6">
                  <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                        <span class="text-xl">🔖</span>
                      </div>
                      <div>
                        <h2 class="text-xl font-bold text-gray-900">Bookmarked Courses</h2>
                        <p class="text-gray-500 text-sm">Saved for later</p>
                      </div>
                    </div>
                    <div class="px-3 py-1 rounded-full bg-orange-50 border border-orange-200">
                      <span class="text-xs font-medium text-orange-600">{{ courseStore.bookmarkedCourses.length }} items</span>
                    </div>
                  </div>
                  <div class="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                    <CourseList
                      :courses="courseStore.bookmarkedCourses"
                      :showProgress="true"
                      :showBookmark="false"
                      emptyMessage="No bookmarked courses"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative floating elements -->
        <div class="fixed bottom-8 right-8 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
        <div class="fixed top-32 left-8 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCourseStore } from "../stores/courseStore";
import DashboardCard from "../components/dashboard/DashboardCard.vue";
import CourseList from "../components/dashboard/CourseList.vue";
import LoadingSpinner from "../components/ui/LoadingSpinner.vue";

const courseStore = useCourseStore();
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Animation delays */
.animate-delay-0 { animation-delay: 0ms; }
.animate-delay-100 { animation-delay: 100ms; }
.animate-delay-200 { animation-delay: 200ms; }
.animate-delay-300 { animation-delay: 300ms; }
.animate-delay-400 { animation-delay: 400ms; }

/* Custom scrollbar for glass panels */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #f59e0b;
}

/* Slow pulse animation */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .rounded-2xl {
    border-radius: 1.25rem;
  }
}

/* Smooth hover transitions */
.group:hover .rounded-2xl {
  transform: translateY(-2px);
}
</style>