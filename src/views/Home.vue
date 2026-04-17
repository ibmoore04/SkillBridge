<template>
  <div>
    <HeroSection />

    <div id="benefit">
      <BenefitsSection />
    </div>

    <div id="courses">
      <CoursesSection />
    </div>

    <div id="about">
      <BenefitCard />
    </div>

    <div id="contact">
      <TestimonialsSection />
    </div>

    <div id="pricing">
      <PricingSection />
    </div>

    <div id="accordion">
      <Accordion />
    </div>
  </div>
</template>

<script setup>
import HeroSection from "../components/sections/HeroSection.vue";
import BenefitsSection from "../components/sections/BenefitSection.vue";
import BenefitCard from "../components/sections/BenefitCard.vue";
import CoursesSection from "../components/sections/CourseSection.vue";
import Accordion from "../components/sections/Accordion.vue";
import TestimonialsSection from "../components/sections/TestimonialSection.vue";
import PricingSection from "../components/sections/PricingSection.vue";
</script>
