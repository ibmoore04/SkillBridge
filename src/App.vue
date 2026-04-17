<template>
  <Header v-if="!route.meta.hideLayout" />

  <RouterView />

  <Footer v-if="!route.meta.hideLayout" />
</template>

<script setup>
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>