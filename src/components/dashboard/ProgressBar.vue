<template>
  <div class="w-full bg-gray-200 rounded-full h-2">
    <div
      class="h-2 rounded-full transition-all duration-300"
      :class="progressBarClass"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
  <div class="flex justify-between items-center mt-1">
    <span class="text-xs text-gray-600">{{ progress }}% Complete</span>
    <span v-if="showLabel" class="text-xs text-gray-600">{{ label }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  progress: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100,
  },
  color: {
    type: String,
    default: "blue",
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: "",
  },
});

const progressBarClass = computed(() => {
  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };
  return colors[props.color] || colors.blue;
});
</script>