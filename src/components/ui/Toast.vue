<template>
  <div
    v-if="isVisible"
    class="fixed top-4 right-4 z-50 max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4"
    :class="toastClasses"
  >
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <span class="text-lg">{{ icon }}</span>
      </div>
      <div class="ml-3 w-0 flex-1">
        <p class="text-sm font-medium text-gray-900">{{ title }}</p>
        <p class="mt-1 text-sm text-gray-500">{{ message }}</p>
      </div>
      <div class="ml-4 flex-shrink-0 flex">
        <button
          @click="close"
          class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <span class="sr-only">Close</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "info", // success, error, warning, info
  },
  duration: {
    type: Number,
    default: 5000, // 5 seconds
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const toastClasses = ref("");
const icon = ref("");

const setToastType = () => {
  switch (props.type) {
    case "success":
      toastClasses.value = "border-green-200 bg-green-50";
      icon.value = "✅";
      break;
    case "error":
      toastClasses.value = "border-red-200 bg-red-50";
      icon.value = "❌";
      break;
    case "warning":
      toastClasses.value = "border-yellow-200 bg-yellow-50";
      icon.value = "⚠️";
      break;
    default:
      toastClasses.value = "border-blue-200 bg-blue-50";
      icon.value = "ℹ️";
  }
};

const close = () => {
  emit("close");
};

watch(() => props.type, setToastType, { immediate: true });

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(() => {
      close();
    }, props.duration);
  }
});
</script>