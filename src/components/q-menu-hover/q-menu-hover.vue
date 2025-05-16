<template>
  <q-menu
    ref="menuRef"
    v-bind="$attrs"
    :anchor="props.anchor"
    :self="props.self"
    v-model="menuVisible"
    @mouseenter="handleMenuHover"
    @mouseleave="handleMenuLeave"
  >
    <slot></slot>
  </q-menu>
</template>

<script setup lang="ts">
import { useElementHover, useParentElement } from '@vueuse/core';
import { debounce, QMenu, QMenuProps } from 'quasar';
import { triggerRef } from 'vue';
import { shallowRef } from 'vue';
import { onBeforeUnmount } from 'vue';
import { onBeforeMount } from 'vue';
import { computed, provide, inject, ref, watch, nextTick, InjectionKey, onMounted, Ref } from 'vue';
import { injectionKey } from './constant';

interface Submenu {
  id: string;
}

interface Props extends QMenuProps {
}
const props = withDefaults(defineProps<Props>(), {});

const id = crypto.randomUUID()

const triggerEl = useParentElement()

const isTriggerHover = useElementHover(triggerEl, {
  delayLeave: 200,
})

const menuRef = ref<InstanceType<typeof QMenu>>()
const isMenuHover = ref(false)
const handleMenuLeave = debounce(() => {
  isMenuHover.value = false
}, 200)
function handleMenuHover() {
  isMenuHover.value = true
  handleMenuLeave.cancel()
}

// watch(isMenuHover, () => {
//   console.log('🚀 ~ isMenuHover:', isMenuHover);
// })

const rootProvider = inject(injectionKey, null)

const hasSubmenuVisible = computed(() => {
  const { submenuList } = rootProvider ?? {}
  if (!submenuList) {
    return false
  }

  const index = submenuList.value.findIndex((item) => item.id === id)
  if (index === -1) {
    return false
  }

  return index < submenuList.value.length - 1
})

const menuVisible = ref(false)
watch(() => [
  isTriggerHover, isMenuHover, hasSubmenuVisible
], () => {
  menuVisible.value = isTriggerHover.value || isMenuHover.value || hasSubmenuVisible.value
}, { deep: true })


watch(menuVisible, (value) => {
  console.log(`🚀 ~ triggerEl: `, triggerEl);
  console.log(`🚀 ~ ${id}:`, value);
  console.table({ ...rootProvider?.submenuList.value });
  if (value) {
    rootProvider?.bindSubmenu({ id })
  } else {
    rootProvider?.unbindSubmenu(id)
  }
})

onBeforeUnmount(() => {
  rootProvider?.unbindSubmenu(id)
})
</script>