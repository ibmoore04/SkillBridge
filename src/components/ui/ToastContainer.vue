<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <Toast
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      :title="toast.title"
      :message="toast.message"
      :type="toast.type"
      :duration="toast.duration"
      :is-visible="toast.isVisible"
      @close="toastStore.removeToast(toast.id)"
    />
  </div>
</template>

<script setup>
import { useToastStore } from "../../stores/toastStore";
import Toast from "./Toast.vue";

const toastStore = useToastStore();
</script>