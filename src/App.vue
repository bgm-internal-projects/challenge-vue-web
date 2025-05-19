<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMeta } from 'quasar'

useMeta(() => ({
  title: `BGM Vue 挑戰`,
}))
</script>

<style lang="sass">
html, body, #app
  width: 100%
  height: 100%
  padding: 0
  margin: 0

#app
  display: flex
  flex-direction: column
</style>
