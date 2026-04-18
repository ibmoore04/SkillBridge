import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useToastStore } from "./toastStore";

export const useCourseStore = defineStore("courseStore", () => {
  // State
  const courses = ref([]);
  const isLoading = ref(false);

  // Initial course data
  const initialCourses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "Learn HTML, CSS, and JavaScript basics",
      progress: 75,
      completed: false,
      bookmarked: true,
      lastViewed: new Date("2024-04-15"),
      image: "/SkillBridge/images/wall-image.png",
    },
    {
      id: 2,
      title: "React for Beginners",
      description: "Build modern web applications with React",
      progress: 30,
      completed: false,
      bookmarked: false,
      lastViewed: new Date("2024-04-14"),
      image: "/SkillBridge/images/a-man-with-laptop.png",
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      description: "Create server-side applications with Node.js",
      progress: 100,
      completed: true,
      bookmarked: true,
      lastViewed: new Date("2024-04-13"),
      image: "/SkillBridge/images/phone-and-book.png",
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      description: "Master the art of user interface design",
      progress: 50,
      completed: false,
      bookmarked: false,
      lastViewed: new Date("2024-04-12"),
      image: "/SkillBridge/images/woman-with-headset.png",
    },
    {
      id: 5,
      title: "Python for Data Science",
      description: "Analyze data with Python and pandas",
      progress: 20,
      completed: false,
      bookmarked: true,
      lastViewed: new Date("2024-04-11"),
      image: "/SkillBridge/images/girl-with-html.png",
    },
  ];

  // Save data to localStorage
  const saveToStorage = () => {
    localStorage.setItem(
      "courseStore",
      JSON.stringify({
        courses: courses.value,
      }),
    );
  };

  // Computed properties
  const totalCourses = computed(() => courses.value.length);
  const completedCourses = computed(
    () => courses.value.filter((course) => course.completed).length,
  );
  const totalProgress = computed(() => {
    if (courses.value.length === 0) return 0;
    const total = courses.value.reduce(
      (sum, course) => sum + course.progress,
      0,
    );
    return Math.round(total / courses.value.length);
  });
  const recentlyViewedCourses = computed(() =>
    courses.value
      .filter((course) => course.lastViewed)
      .sort((a, b) => new Date(b.lastViewed) - new Date(a.lastViewed))
      .slice(0, 3),
  );
  const bookmarkedCourses = computed(() =>
    courses.value.filter((course) => course.bookmarked),
  );

  // Actions
  const loadCourses = async () => {
    isLoading.value = true;
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Load from localStorage or use initial data
      const stored = localStorage.getItem("courseStore");
      if (stored) {
        const parsed = JSON.parse(stored);
        courses.value = parsed.courses.map((course) => ({
          ...course,
          lastViewed: new Date(course.lastViewed),
        }));
      } else {
        // Use initial data if no stored data
        courses.value = initialCourses.map((course) => ({ ...course }));
        saveToStorage();
      }
    } catch (error) {
      console.error("Error loading courses:", error);
      courses.value = initialCourses.map((course) => ({ ...course }));
    } finally {
      isLoading.value = false;
    }
  };

  const updateProgress = (courseId, progress) => {
    const course = courses.value.find((c) => c.id === courseId);
    if (course) {
      course.progress = Math.min(100, Math.max(0, progress));
      course.completed = course.progress === 100;
      course.lastViewed = new Date();
      saveToStorage();
    }
  };

  const toggleBookmark = (courseId) => {
    const course = courses.value.find((c) => c.id === courseId);
    if (course) {
      course.bookmarked = !course.bookmarked;
      saveToStorage();
      const toastStore = useToastStore();
      if (course.bookmarked) {
        toastStore.showSuccess(
          "Course Bookmarked",
          `${course.title} has been added to your bookmarks`,
        );
      } else {
        toastStore.showInfo(
          "Bookmark Removed",
          `${course.title} has been removed from your bookmarks`,
        );
      }
    }
  };

  const markAsViewed = (courseId) => {
    const course = courses.value.find((c) => c.id === courseId);
    if (course) {
      course.lastViewed = new Date();
      saveToStorage();
      const toastStore = useToastStore();
      toastStore.showInfo(
        "Course Viewed",
        `Marked ${course.title} as recently viewed`,
      );
    }
  };

  // Initialize
  loadCourses();

  return {
    courses,
    isLoading,
    totalCourses,
    completedCourses,
    totalProgress,
    recentlyViewedCourses,
    bookmarkedCourses,
    loadCourses,
    updateProgress,
    toggleBookmark,
    markAsViewed,
  };
});
