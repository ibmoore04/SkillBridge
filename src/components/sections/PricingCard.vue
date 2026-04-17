<template>
  <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center h-full">
    <h3 class="text-xl font-semibold mb-4">{{ plan.name }}</h3>
    <div class="text-3xl font-bold mb-4">{{ type === 'monthly' ? plan.monthly : plan.yearly }}</div>
    <ul class="mb-4 space-y-2 text-gray-600 text-center">
      <li v-for="(feature, index) in plan.features" :key="index">• {{ feature }}</li>
    </ul>
    <Button @click="selectPlan">Choose Plan</Button>
  </div>
</template>

<script setup>
defineProps({
  plan: Object,
  type: String
})

function selectPlan() {
  console.log(`Selected ${props.plan.name} plan (${props.type})`)
}
</script>