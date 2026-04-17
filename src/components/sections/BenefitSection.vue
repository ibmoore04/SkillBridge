<template>
  <section class="bg-white py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Image Container -->
      <div class="relative rounded-2xl overflow-hidden">
        <!-- Background Image -->
        <img src="/images/a-man-and-a-girl.png" alt="Banner"
          class="w-full h-[500px] md:h-[500px] object-cover" />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/20"></div>

        <!-- Center Play Button -->
        <div class="absolute inset-0 flex items-center justify-center">
          <button
            class="bg-white/80 animate-pulse hover:bg-white backdrop-blur p-5 rounded-full shadow-lg transition transform hover:scale-110">
            <!-- Play Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-orange-500" viewBox="0 0 24 24"
              fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// static section
</script>
