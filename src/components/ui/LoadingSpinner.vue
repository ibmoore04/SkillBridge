<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div
      class="animate-spin rounded-full border-4 border-gray-200 border-t-orange-500"
      :class="spinnerClass"
    ></div>
    <span v-if="text" class="ml-3 text-gray-600">{{ text }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "md", // sm, md, lg, xl
  },
  text: {
    type: String,
    default: "",
  },
  fullScreen: {
    type: Boolean,
    default: false,
  },
});

const spinnerClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "h-4 w-4";
    case "lg":
      return "h-8 w-8";
    case "xl":
      return "h-12 w-12";
    default:
      return "h-6 w-6";
  }
});

const containerClass = computed(() => {
  return props.fullScreen ? "fixed inset-0 bg-white bg-opacity-75 z-50" : "";
});
</script>