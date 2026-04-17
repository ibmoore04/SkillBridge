<template>
  <section class="bg-white py-16 px-4">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            What Our Students Say
          </h2>
          <p class="text-gray-500 text-sm md:text-base max-w-xl">
            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et.
          </p>
        </div>

        <button class="self-start md:self-auto text-sm text-gray-700 hover:text-orange-500">
          View All
        </button>
      </div>

      <!-- GRID -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">

        <!-- CARD 1 -->
        <div class="bg-gray-50 rounded-xl p-6 flex flex-col justify-between min-h-[180px]">
          <p class="text-gray-600 text-sm mb-6">
            "The courses completely changed how I approach UI design."
          </p>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img src="/images/woman-with-headset.png" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <p class="text-sm font-semibold">Sarah Johnson</p>
                <p class="text-xs text-gray-500">UI/UX Designer</p>
              </div>
            </div>
            <div class="text-orange-500 text-sm font-medium">★ 5.0</div>
          </div>
        </div>

        <!-- CARD 2 -->
        <div class="bg-gray-50 rounded-xl p-6 flex flex-col justify-between min-h-[180px]">
          <p class="text-gray-600 text-sm mb-6">
            "Very structured learning path and practical projects."
          </p>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img src="/images/a-man-with-laptop.png" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <p class="text-sm font-semibold">David Smith</p>
                <p class="text-xs text-gray-500">Frontend Developer</p>
              </div>
            </div>
            <div class="text-orange-500 text-sm font-medium">★ 4.8</div>
          </div>
        </div>

        <!-- CARD 3 -->
        <div class="bg-gray-50 rounded-xl p-6 flex flex-col justify-between min-h-[180px]">
          <p class="text-gray-600 text-sm mb-6">
            "Great instructors and real-world examples."
          </p>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img src="/images/girl-with-html.png" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <p class="text-sm font-semibold">Emily Davis</p>
                <p class="text-xs text-gray-500">Product Designer</p>
              </div>
            </div>
            <div class="text-orange-500 text-sm font-medium">★ 5.0</div>
          </div>
        </div>

        <!-- CARD 4 -->
        <div class="bg-gray-50 rounded-xl p-6 flex flex-col justify-between min-h-[180px]">
          <p class="text-gray-600 text-sm mb-6">
            "I was able to land my first job after this course."
          </p>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img src="/images/phone-and-book.png" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <p class="text-sm font-semibold">Michael Lee</p>
                <p class="text-xs text-gray-500">Junior Developer</p>
              </div>
            </div>
            <div class="text-orange-500 text-sm font-medium">★ 4.9</div>
          </div>
        </div>

        <!-- CARD 5 -->
        <div class="bg-gray-50 rounded-xl p-6 flex flex-col justify-between min-h-[180px]">
          <p class="text-gray-600 text-sm mb-6">
            "The best platform for beginners in design."
          </p>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img src="/images/keyboard.png" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <p class="text-sm font-semibold">Anna Brown</p>
                <p class="text-xs text-gray-500">Graphic Designer</p>
              </div>
            </div>
            <div class="text-orange-500 text-sm font-medium">★ 5.0</div>
          </div>
        </div>

        <!-- CARD 6 -->
        <div class="bg-gray-50 rounded-xl p-6 flex flex-col justify-between min-h-[180px]">
          <p class="text-gray-600 text-sm mb-6">
            "Clear explanations and excellent structure."
          </p>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img src="/images/wall-image.png" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <p class="text-sm font-semibold">James Wilson</p>
                <p class="text-xs text-gray-500">Web Developer</p>
              </div>
            </div>
            <div class="text-orange-500 text-sm font-medium">★ 4.7</div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>

</script>


<style scoped>
div {
  transition: all 0.2s ease;
}
</style>