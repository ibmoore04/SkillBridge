<template>
  <main class="bg-gray-50 py-16">
    <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">

      <!-- LEFT: TESTIMONIAL -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Students Testimonials
        </h2>

        <p class="text-gray-500 mb-8">
          Hear what our students have to say about their learning experience.
        </p>

        <div class="bg-white p-6 rounded-xl shadow-sm border">
          <p class="text-gray-600 mb-6">
            The web design course provided a solid foundation for me...
          </p>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsEV1cmRYNcFh_-d-dqVHpxP4MPS4K4WDQ6w&s"
                class="w-10 h-10 rounded-full object-cover"
              />
              <span class="text-sm font-medium text-gray-700">Sarah L</span>
            </div>

            <button
              @click="showTestimonial"
              class="text-sm px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Read More
            </button>
          </div>
        </div>
      </div>

      <!-- RIGHT: SIGNUP FORM -->
      <div class="bg-white p-8 rounded-xl shadow-sm border">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Sign Up</h2>
        <p class="text-gray-500 mb-6">
          Create an account to unlock exclusive features.
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-5">

          <!-- NAME -->
          <div>
            <label class="text-sm text-gray-600">Full Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Enter your name"
              class="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          <!-- EMAIL -->
          <div>
            <label class="text-sm text-gray-600">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="Enter your email"
              class="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          <!-- PASSWORD -->
          <div>
            <label class="text-sm text-gray-600">Password</label>

            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                placeholder="Enter your password"
                class="w-full mt-1 px-4 py-2 border rounded-md pr-10 focus:ring-2 focus:ring-orange-400 outline-none"
              />

              <button
                type="button"
                @click="togglePassword"
                class="absolute right-3 top-1/2 -translate-y-1/2"
              >
                👁
              </button>
            </div>
          </div>

          <!-- TERMS -->
          <div class="flex items-center gap-2">
            <input type="checkbox" v-model="form.agree" />
            <label class="text-sm text-gray-600">
              I agree to Terms & Privacy Policy
            </label>
          </div>

          <!-- SUBMIT -->
          <button
            type="submit"
            class="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
        </form>

        <!-- LOGIN LINK -->
        <p class="text-sm text-gray-500 mt-6 text-center">
          Already have an account?
          <a href="/login" class="text-orange-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();

/* FORM */
const form = reactive({
  name: "",
  email: "",
  password: "",
  agree: false,
});

const showPassword = ref(false);

/* TOGGLE PASSWORD */
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

/* VALIDATION */
const validateForm = () => {
  if (!form.name.trim()) {
    Swal.fire("Missing Name", "Enter your full name", "warning");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    Swal.fire("Invalid Email", "Enter a valid email", "error");
    return false;
  }

  if (form.password.length < 6) {
    Swal.fire("Weak Password", "Minimum 6 characters", "info");
    return false;
  }

  if (!form.agree) {
    Swal.fire("Terms Required", "Accept terms to continue", "question");
    return false;
  }

  return true;
};

/* SIGNUP */
const handleSubmit = () => {
  if (!validateForm()) return;

  const existingUser = JSON.parse(localStorage.getItem("user"));

  if (existingUser && existingUser.email === form.email) {
    return Swal.fire("Exists", "Account already exists", "warning");
  }

  Swal.fire({
    title: "Creating Account...",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  setTimeout(() => {
    const user = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "false");

    Swal.fire("Success 🎉", "Account created successfully", "success");

    form.name = "";
    form.email = "";
    form.password = "";
    form.agree = false;
    showPassword.value = false;

    router.push("/login");
  }, 1000);
};

/* TESTIMONIAL */
const showTestimonial = () => {
  Swal.fire(
    "Student Review",
    "This course changed my career path completely!",
    "info"
  );
};
</script>