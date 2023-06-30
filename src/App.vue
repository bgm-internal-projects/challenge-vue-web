<template>
  <router-view />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

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
