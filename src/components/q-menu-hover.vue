<template>
  <q-menu
    ref="menuRef"
    V-bind="$attrs"
    :model-value="menuVisible"
    @mouseenter="isMenuHover = true"
    @mouseleave="isMenuHover = false"
  >
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

const triggerEl = useParentElement()

const isTriggerHover = useElementHover(triggerEl, {
  delayLeave: 200,
})

const menuRef = ref<InstanceType<typeof QMenu>>()
const isMenuHover = ref(false)
// watch(isMenuHover, () => {
//   console.log('🚀 ~ isMenuHover:', isMenuHover);
// })

const submenuList = shallowRef<Submenu[]>([])
const parentProvider = inject(injectionKey)
const isParentMenu = computed(() => !!parentProvider)

const menuVisible = computed(() => {
  return isTriggerHover.value || isMenuHover.value
})

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
      isHover: isTriggerHover,
    })
  }
})

onBeforeUnmount(() => {
  parentProvider?.unbindSubmenu(id)
})
</script>