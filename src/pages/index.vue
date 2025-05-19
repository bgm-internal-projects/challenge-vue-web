<template>
  <div class="flex flex-col justify-start items-start gap-4">
    我是 Home Page，目前有以下頁面：

    <div class="flex flex-col gap-4">
      <div
        v-if="routeList.length === 0"
        class="p-4"
      >
        目前沒有其他頁面
      </div>

      <q-btn
        v-for="item of routeList"
        :key="item.path"
        :to="item.path"
        :label="item.path"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { routes } from 'vue-router/auto-routes'

const routeList = computed(() => routes.filter((route) => route.path !== '/'))
</script>

<style scoped lang="sass">
</style>
