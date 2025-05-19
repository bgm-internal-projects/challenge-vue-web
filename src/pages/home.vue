<template>
  <div class="flex gap-10">
    我是 Home Page
    {{ store.data }}
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '../stores/main.store'

const store = useMainStore()
</script>

<style scoped lang="sass">
</style>
