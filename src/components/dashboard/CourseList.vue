<template>
  <div v-if="courses.length === 0" class="text-center py-12">
    <div class="text-gray-400 text-6xl mb-4">📚</div>
    <h3 class="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
    <p class="text-gray-500 mb-6">{{ emptyMessage }}</p>
    <button
      v-if="showEnrollButton"
      class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
    >
      Browse Courses
    </button>
  </div>
  <div v-else class="space-y-4">
    <div
      v-for="course in courses"
      :key="course.id"
      class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <img
        :src="course.image"
        :alt="course.title"
        class="w-12 h-12 rounded-lg object-cover flex-shrink-0"
      />
      <div class="flex-1 min-w-0">
        <h3 class="text-sm font-medium text-gray-900 truncate">{{ course.title }}</h3>
        <p class="text-xs text-gray-500 truncate">{{ course.description }}</p>
        <div v-if="showProgress" class="mt-2">
          <ProgressBar :progress="course.progress" :color="course.completed ? 'green' : 'blue'" />
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button
          v-if="showBookmark"
          @click="toggleBookmark(course.id)"
          class="text-gray-400 hover:text-yellow-500 transition-colors"
          :class="{ 'text-yellow-500': course.bookmarked }"
        >
          ⭐
        </button>
        <button
          @click="viewCourse(course.id)"
          class="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          View
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCourseStore } from "../../stores/courseStore";
import ProgressBar from "./ProgressBar.vue";

const props = defineProps({
  courses: {
    type: Array,
    required: true,
  },
  showProgress: {
    type: Boolean,
    default: true,
  },
  showBookmark: {
    type: Boolean,
    default: true,
  },
  emptyMessage: {
    type: String,
    default: "No courses found",
  },
  showEnrollButton: {
    type: Boolean,
    default: false,
  },
});

const courseStore = useCourseStore();

const toggleBookmark = (courseId) => {
  courseStore.toggleBookmark(courseId);
};

const viewCourse = (courseId) => {
  courseStore.markAsViewed(courseId);
  // Here you could navigate to the course page
  // router.push(`/course/${courseId}`);
};
</script>