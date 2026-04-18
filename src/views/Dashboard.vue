<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p class="text-gray-600">Track your learning progress and manage your courses</p>
      </div>

      <!-- Loading State -->
      <div v-if="courseStore.isLoading" class="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Loading your courses..." />
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Total Courses"
            :value="courseStore.totalCourses"
            icon="📚"
            color="blue"
          />
          <DashboardCard
            title="Completed Courses"
            :value="courseStore.completedCourses"
            icon="✅"
            color="green"
          />
          <DashboardCard
            title="Overall Progress"
            :value="`${courseStore.totalProgress}%`"
            icon="📈"
            color="purple"
          />
        </div>

        <!-- Course Sections -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recently Viewed -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Recently Viewed</h2>
            <CourseList
              :courses="courseStore.recentlyViewedCourses"
              :showProgress="true"
              :showBookmark="true"
              emptyMessage="No recently viewed courses"
            />
          </div>

          <!-- Bookmarked Courses -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Bookmarked Courses</h2>
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
</template>

<script setup>
import { useCourseStore } from "../stores/courseStore";
import DashboardCard from "../components/dashboard/DashboardCard.vue";
import CourseList from "../components/dashboard/CourseList.vue";
import LoadingSpinner from "../components/ui/LoadingSpinner.vue";

const courseStore = useCourseStore();
</script>