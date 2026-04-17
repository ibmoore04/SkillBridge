<template>
  <section id="faq" class="max-w-7xl mx-auto py-16 px-4">
    <h2 class="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
    <div>
      <Accordion
        v-for="(item, index) in faqItems"
        :key="index"
        :title="item.question"
        :content="item.answer"
      />
    </div>
  </section>
</template>

<script setup>
import Accordion from './Accordion.vue'

const faqItems = [
  { question: 'How do I enroll?', answer: 'You can enroll by clicking the Enroll button on course pages.' },
  { question: 'What is the refund policy?', answer: 'We offer a 30-day money-back guarantee.' },
  { question: 'Are there any discounts?', answer: 'Subscribe to our newsletter for special discounts.' },
]
</script>