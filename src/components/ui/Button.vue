<template>
  <button :class="computedClass" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary", // 'secondary'
  },
});

const computedClass = computed(() => {
  if (props.variant === "primary") {
    return "bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-200";
  } else if (props.variant === "secondary") {
    return "border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded transition duration-200";
  }
});
</script>
