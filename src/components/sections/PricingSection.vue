<template>
  <section class="bg-white py-16 px-4">
    <div class="max-w-5xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
          Our Pricing
        </h2>
        <p class="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
          Choose the plan that fits your learning journey best.
        </p>
      </div>

      <!-- Cards -->
      <div class="grid gap-6 md:grid-cols-2">

        <div
          v-for="(plan, index) in plans"
          :key="index"
          class="border border-gray-200 rounded-2xl p-8 flex flex-col justify-between min-h-[520px]"
        >

          <!-- Top -->
          <div>

            <!-- Title -->
            <h3 class="text-lg font-semibold text-gray-900 mb-6">
              {{ plan.name }}
            </h3>

            <!-- Price -->
            <div class="mb-10">
              <span class="text-5xl font-bold text-gray-900">
                ${{ plan.price }}
              </span>
              <span class="text-gray-500 text-sm">/ {{ plan.period }}</span>
            </div>

            <!-- Features -->
            <ul class="space-y-4 text-sm text-gray-600">
              <li v-for="(f, i) in plan.features" :key="i">
                ✔ {{ f }}
              </li>
            </ul>

          </div>

          <!-- Button -->
          <button
            class="mt-10 w-full py-3 rounded-lg font-medium transition"
            :class="plan.popular
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'"
            @click="selectPlan(plan)"
          >
            Get Started
          </button>

        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const selected = ref(null);

const plans = ref([
  {
    name: "Basic Plan",
    price: 19,
    period: "month",
    features: [
      "Access to beginner courses",
      "Community support",
      "Limited projects",
      "Basic certificates",
      "Standard learning materials",
    ],
  },
  {
    name: "Pro Plan",
    price: 39,
    period: "month",
    popular: true,
    features: [
      "Access to all courses",
      "Priority support",
      "Unlimited projects",
      "Certificates included",
      "Career guidance",
      "Advanced learning resources",
    ],
  },
]);

const selectPlan = (plan) => {
  selected.value = plan.name;
  console.log("Selected plan:", plan);
};
</script>

<style scoped>
button {
  transition: all 0.2s ease;
}
</style>