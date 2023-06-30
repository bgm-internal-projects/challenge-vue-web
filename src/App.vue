<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';

useMeta(() => ({
  title: `Vue 挑戰`,
  titleTemplate: (title) => `${title} v${import.meta.env.PACKAGE_VERSION}`,
}));
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
