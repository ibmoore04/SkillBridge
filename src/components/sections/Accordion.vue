<template>
  <section class="bg-white py-16 px-4">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">

      <!-- LEFT SIDE -->
      <div>
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>

        <p class="text-gray-500 text-sm md:text-base">
          Everything you need to know about the platform, courses, and pricing.
          If you have other questions, feel free to contact us.
        </p>
      </div>

      <!-- RIGHT SIDE (ACCORDION) -->
      <div class="space-y-4">

        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="border border-gray-200 rounded-xl overflow-hidden"
        >

          <!-- Question -->
          <button
            class="w-full flex justify-between items-center p-4 text-left bg-white"
            @click="toggle(index)"
          >
            <span class="text-sm font-medium text-gray-900">
              {{ item.question }}
            </span>

            <span class="text-gray-500 text-xl">
              {{ activeIndex === index ? "−" : "+" }}
            </span>
          </button>

          <!-- Answer -->
          <div
            v-if="activeIndex === index"
            class="p-4 pt-0 text-sm text-gray-500 bg-white"
          >
            {{ item.answer }}
          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const activeIndex = ref(null);

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const faqs = [
  {
    question: "What is this platform about?",
    answer: "It is an online learning platform for design and development courses.",
  },
  {
    question: "Do I get a certificate?",
    answer: "Yes, all paid courses include a verified certificate upon completion.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time without penalties.",
  },
  {
    question: "Do I need experience to start?",
    answer: "No, beginner-friendly courses are available for all learners.",
  },
];
</script>

<style scoped>
button {
  transition: all 0.2s ease;
}
</style>