<template>
  <section class="bg-white py-16 px-4">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div class="flex items-start justify-between mb-10">
        <div>
          <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Benefits
          </h2>
          <p class="text-gray-500 max-w-xl text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et.
          </p>
        </div>

        <button class="hidden md:block text-sm text-gray-700 hover:text-orange-500">
          View All
        </button>
      </div>

      <!-- Cards Grid -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <div
          v-for="(item, index) in benefits"
          :key="index"
          class="bg-gray-50 rounded-xl p-6 relative hover:shadow-md transition"
        >
          <!-- Number -->
          <div class="text-3xl font-bold text-gray-300 mb-4">
            {{ item.number }}
          </div>

          <!-- Title -->
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            {{ item.title }}
          </h3>

          <!-- Description -->
          <p class="text-sm text-gray-500">
            {{ item.desc }}
          </p>

          <!-- Arrow -->
          <div class="absolute bottom-4 right-4 text-orange-500 text-lg">
            ↗
          </div>
        </div>

      </div>

      <!-- Mobile View All -->
      <div class="mt-8 text-center md:hidden">
        <button class="text-sm text-gray-700 hover:text-orange-500">
          View All
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
const benefits = [
  {
    number: "01",
    title: "Flexible Learning Schedule",
    desc: "Fit your coursework around your existing commitments and obligations.",
  },
  {
    number: "02",
    title: "Expert Instruction",
    desc: "Learn from industry experts who have hands-on experience in design and development.",
  },
  {
    number: "03",
    title: "Diverse Course Offerings",
    desc: "Explore a wide range of design and development courses covering various topics.",
  },
  {
    number: "04",
    title: "Updated Curriculum",
    desc: "Access courses with up-to-date content reflecting the latest trends and industry practices.",
  },
  {
    number: "05",
    title: "Practical Projects and Assignments",
    desc: "Develop a portfolio showcasing your skills and abilities to potential employers.",
  },
  {
    number: "06",
    title: "Interactive Learning Environment",
    desc: "Collaborate with fellow learners, exchanging ideas and feedback.",
  },
];
</script>

<style scoped>
div {
  transition: all 0.2s ease;
}
</style>