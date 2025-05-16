<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { QMenuProps } from 'quasar';
import { triggerRef } from 'vue';
import { shallowRef } from 'vue';
import { provide } from 'vue';
import { injectionKey, Submenu } from './constant';

interface Props extends QMenuProps {
}
const props = withDefaults(defineProps<Props>(), {});

const submenuList = shallowRef<Submenu[]>([])

function bindSubmenu(data: Submenu) {
  submenuList.value = [...submenuList.value, data]
}
function unbindSubmenu(id: string) {
  const index = submenuList.value.findIndex((item) => item.id === id)
  if (index !== -1) {
    submenuList.value.splice(index, 1)
  }
  triggerRef(submenuList)
}

provide(injectionKey, {
  bindSubmenu,
  unbindSubmenu,
  submenuList,
})
</script>