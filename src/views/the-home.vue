<template>
  <div class="flex gap-10">
    我是 Home Page，右邊是響應式圖片
    <q-img
      :src="imgSrc"
      :srcset="imgSrcset"
    />
    {{ store.data }}
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import imgSrc from '../assets/logo.png';

/** 引入響應式圖片
 * https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md
 */
import imgs from '../assets/logo.png?width=300;800;1200;1600&webp&metadata';
import { useMainStore } from '../stores/main.store';

const imgSrcset = computed(() => {
  if (!Array.isArray(imgs)) {
    return imgSrc;
  }

  return imgs.map((data) => {
    return `${data.src} ${data.width}w`;
  }).join(', ');
});

const store = useMainStore();
</script>

<style scoped lang="sass">
</style>
