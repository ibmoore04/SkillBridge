<template>
  <section class="bg-white text-black pt-20 pb-12 px-4">
    <div class="max-w-5xl mx-auto text-center">

      <!-- Badge -->
      <div class="inline-flex items-center gap-3 bg-slate-50 text-gray-900 px-5 py-3 rounded-xl mb-6 shadow-sm">
        <div class="bg-orange-100 p-2 rounded-md">
          ⚡
        </div>
        <p class="text-sm md:text-base font-be-vietnam font-medium">
          <span class="text-orange-500 font-be-vietnam font-semibold">Unlock</span>
          Your Creative Potential
        </p>
      </div>
      <!-- Main Heading -->
      <h1 class="text-3xl md:text-5xl font-be-vietnam font-semibold leading-tight mb-4">
        with Online Design and Development Courses.
      </h1>

      <!-- Subtext -->
      <p class="text-gray-400 text-sm md:text-base font-be-vietnam max-w-2xl mx-auto mb-8">
        Learn from Industry Experts and Enhance Your Skills.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-14">
        <button
          class="bg-brand text-white px-6 py-3 rounded-lg font-be-vietnam font-medium w-full sm:w-auto"
        >
          Explore Courses
        </button>

        <button
          class="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-be-vietnam font-medium w-full sm:w-auto"
        >
          View Pricing
        </button>
      </div>
    </div>

    <div class="max-w-6xl mx-auto bg-gray-100 rounded-2xl overflow-hidden px-6 py-6">

  <div class="relative w-full overflow-hidden">

    <!-- Track -->
    <div class="flex w-max animate-scroll gap-12 items-center text-gray-500 text-sm">

      <!-- First set -->
      <span class="opacity-70">Zapier</span>
      <span class="opacity-70">Spotify</span>
      <span class="opacity-70">Zoom</span>
      <span class="opacity-70">Amazon</span>
      <span class="opacity-70">Adobe</span>
      <span class="opacity-70">Notion</span>

      <!-- Duplicate set (IMPORTANT for smooth loop) -->
      <span class="opacity-70">Zapier</span>
      <span class="opacity-70">Spotify</span>
      <span class="opacity-70">Zoom</span>
      <span class="opacity-70">Amazon</span>
      <span class="opacity-70">Adobe</span>
      <span class="opacity-70">Notion</span>

      <!-- Duplicate set (IMPORTANT for smooth loop) -->
      <span class="opacity-70">Zapier</span>
      <span class="opacity-70">Spotify</span>
      <span class="opacity-70">Zoom</span>
      <span class="opacity-70">Amazon</span>
      <span class="opacity-70">Adobe</span>
      <span class="opacity-70">Notion</span>

      <!-- Duplicate set (IMPORTANT for smooth loop) -->
      <span class="opacity-70">Zapier</span>
      <span class="opacity-70">Spotify</span>
      <span class="opacity-70">Zoom</span>
      <span class="opacity-70">Amazon</span>
      <span class="opacity-70">Adobe</span>
      <span class="opacity-70">Notion</span>

    </div>

  </div>
</div>
  </section>
</template>

<script setup>
// static section
</script>

<style scoped>
button {
  transition: all 0.2s ease;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 15s linear infinite;
}
</style>