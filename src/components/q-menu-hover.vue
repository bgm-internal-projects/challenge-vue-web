<template>
  <q-menu ref="menuRef">
    <slot></slot>
  </q-menu>
</template>

<script setup lang="ts">
import { useElementHover, useParentElement } from '@vueuse/core';
import { debounce, QMenu, QMenuProps } from 'quasar';
import { shallowRef } from 'vue';
import { onBeforeUnmount } from 'vue';
import { onBeforeMount } from 'vue';
import { computed, provide, inject, ref, watch, nextTick, InjectionKey, onMounted, Ref } from 'vue';

interface Submenu {
  id: string;
  isHover: Ref<boolean>;
}

interface Props extends QMenuProps {
}
const props = withDefaults(defineProps<Props>(), {});

const id = crypto.randomUUID()

const injectionKey = Symbol('q-menu-hover') as InjectionKey<{
  bindSubmenu: (data: {
    id: string;
    isHover: Ref<boolean>;
  }) => void;
  unbindSubmenu: (id: string) => void;
}>

const parentEl = useParentElement()
onMounted(() => {
  console.log('parentEl: ', parentEl.value)
})

const isHover = useElementHover(parentEl)
watch(isHover, (val) => {
  console.log('🚀 ~ isHover:', isHover);
})

const menuRef = ref<InstanceType<typeof QMenu>>()
const submenuList = shallowRef<Submenu[]>([])
const parentProvider = inject(injectionKey)
const isParentMenu = computed(() => !!parentProvider)


function bindSubmenu(data: Submenu) {
  submenuList.value.push(data)
}
function unbindSubmenu(id: string) {
  const index = submenuList.value.findIndex((item) => item.id === id)
  if (index !== -1) {
    submenuList.value.splice(index, 1)
  }
}

provide(injectionKey, {
  bindSubmenu,
  unbindSubmenu,
})

onMounted(() => {
  if (!isParentMenu.value) {
    parentProvider?.bindSubmenu({
      id,
      isHover,
    })
  }
})

onBeforeUnmount(() => {
  parentProvider?.unbindSubmenu(id)
})
</script>