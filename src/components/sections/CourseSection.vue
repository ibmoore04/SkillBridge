<template>
  <section class="bg-white py-16 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
      >
        <div>
          <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Our Courses
          </h2>
          <p class="text-gray-500 max-w-xl text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget
            elit id imperdiet et.
          </p>
        </div>

        <button
          class="self-start md:self-auto text-sm text-gray-700 hover:text-orange-500"
        >
          View All
        </button>
      </div>

      <!-- Cards Grid -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <!-- Card 1 -->
        <div class="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition">
          <img
            src="/images/wall-image.png"
            alt="Web Design Fundamentals"
            class="w-full h-48 md:h-56 object-cover"
            @error="handleImageError"
          />
          <div class="p-5">
            <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span>4 Weeks</span>
              <span>Beginner</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Web Design Fundamentals
            </h3>
            <p class="text-sm text-gray-500 mb-4">
              Learn the fundamentals of web design, including HTML, CSS, and responsive design principles.
            </p>
            <button class="w-full bg-gray-200 hover:bg-orange-500 hover:text-white py-2 rounded-md text-sm font-medium">
              Get it Now
            </button>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition">
          <img
            src="/images/a-man-with-laptop.png"
            alt="UI/UX Design"
            class="w-full h-48 md:h-56 object-cover"
            @error="handleImageError"
          />
          <div class="p-5">
            <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span>6 Weeks</span>
              <span>Intermediate</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              UI/UX Design
            </h3>
            <p class="text-sm text-gray-500 mb-4">
              Master user interface and user experience design principles.
            </p>
            <button class="w-full bg-gray-200 hover:bg-orange-500 hover:text-white py-2 rounded-md text-sm font-medium">
              Get it Now
            </button>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition">
          <img
            src="/images/phone-and-book.png"
            alt="Web Development"
            class="w-full h-48 md:h-56 object-cover"
            @error="handleImageError"
          />
          <div class="p-5">
            <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span>8 Weeks</span>
              <span>Intermediate</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Web Development
            </h3>
            <p class="text-sm text-gray-500 mb-4">
              Build dynamic, full-stack web applications using modern frameworks.
            </p>
            <button class="w-full bg-gray-200 hover:bg-orange-500 hover:text-white py-2 rounded-md text-sm font-medium">
              Get it Now
            </button>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition">
          <img
            src="/images/woman-with-headset.png"
            alt="Mobile App Development"
            class="w-full h-48 md:h-56 object-cover"
            @error="handleImageError"
          />
          <div class="p-5">
            <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span>10 Weeks</span>
              <span>Advanced</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Mobile App Development
            </h3>
            <p class="text-sm text-gray-500 mb-4">
              iOS and Android development using React Native and Flutter.
            </p>
            <button class="w-full bg-gray-200 hover:bg-orange-500 hover:text-white py-2 rounded-md text-sm font-medium">
              Get it Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Simple error handler for all images
const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/600x400/cccccc/666666?text=Image+Not+Found'
}
</script>