<template>
  <div v-if="selectedHeadline" class="news d-flex">
    <img class="banner" :src="selectedHeadline.urlToImage" alt="news-banner" />
  </div>
  <div class="pa-4 text-center">
    <h1>{{ selectedHeadline.title }}</h1>
    <h3>
      {{ selectedHeadline.description }}
    </h3>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const selectedHeadline = computed(() => store.state.selectedHeadline);
</script>

<style>
.news .banner {
  max-height: 500px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
