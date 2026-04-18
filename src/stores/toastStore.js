import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore("toastStore", () => {
  const toasts = ref([]);

  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      title: toast.title,
      message: toast.message || "",
      type: toast.type || "info",
      duration: toast.duration || 5000,
      isVisible: true,
    };
    toasts.value.push(newToast);

    // Auto remove after duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  };

  const removeToast = (id) => {
    const index = toasts.value.findIndex((toast) => toast.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const showSuccess = (title, message = "") => {
    return addToast({ title, message, type: "success" });
  };

  const showError = (title, message = "") => {
    return addToast({ title, message, type: "error" });
  };

  const showWarning = (title, message = "") => {
    return addToast({ title, message, type: "warning" });
  };

  const showInfo = (title, message = "") => {
    return addToast({ title, message, type: "info" });
  };

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
});
