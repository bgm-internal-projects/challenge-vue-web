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
import { onBeforeUnmount } from 'vue';
import { computed, provide, inject, ref, watch } from 'vue';
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
  delayLeave: 100,
})

const menuRef = ref<InstanceType<typeof QMenu>>()
const isMenuHover = ref(false)
const handleMenuLeave = debounce(() => {
  isMenuHover.value = false
}, 100)
function handleMenuHover() {
  isMenuHover.value = true
  handleMenuLeave.cancel()
}

// watch(isMenuHover, () => {
//   console.log('🚀 ~ isMenuHover:', isMenuHover);
// })

const submenuList = ref<Submenu[]>([])

const rootProvider = inject(injectionKey, null)
const currentSubmenuList = computed(() => rootProvider?.submenuList.value ?? [])
// watch(currentSubmenuList, () => {
//   console.log('🚀 ~ [watch] currentSubmenuList:', currentSubmenuList);
// }, { deep: true })

const menuLevel = computed(() => {
  if (!rootProvider) {
    return 0
  }

  const index = currentSubmenuList.value.findIndex((item) => item.id === id)
  return index < 0 ? undefined : index + 1
})

const hasSubmenuVisible = computed(() => {
  if (menuLevel.value === 0 && submenuList.value.length > 0) {
    return true
  }

  const level = menuLevel.value
  if (!level) {
    return false
  }

  return level < currentSubmenuList.value.length - 1
})

const menuVisible = ref(false)
watch(() => [
  isTriggerHover, isMenuHover, hasSubmenuVisible
], () => {
  // if (!rootProvider) {
  //   console.log('\n🚀 ~ root:');
  // } else {
  //   console.log('\n🚀 ~ child:');
  // }

  // console.log('🚀 ~ isTriggerHover:', isTriggerHover);
  // console.log('🚀 ~ isMenuHover:', isMenuHover);
  // console.log('🚀 ~ hasSubmenuVisible:', hasSubmenuVisible);
  // console.log('🚀 ~ menuLevel:', menuLevel);
  // console.log('🚀 ~ currentSubmenuList length:', currentSubmenuList.value.length);

  menuVisible.value = isTriggerHover.value || isMenuHover.value || hasSubmenuVisible.value
}, { deep: true })


watch(menuVisible, (value) => {
  if (value) {
    rootProvider?.bindSubmenu({ id })
  } else {
    rootProvider?.unbindSubmenu(id)
  }
})

// onMounted(() => {
//   console.log('🚀 ~ rootProvider:', rootProvider);
// })

onBeforeUnmount(() => {
  rootProvider?.unbindSubmenu(id)
})

// rootProvider 邏輯
function bindSubmenu(data: Submenu) {
  submenuList.value.push(data)
}
function unbindSubmenu(id: string) {
  const index = submenuList.value.findIndex((item) => item.id === id)
  if (index !== -1) {
    submenuList.value.splice(index, 1)
  }
}
if (!rootProvider) {
  provide(injectionKey, {
    bindSubmenu,
    unbindSubmenu,
    submenuList,
  })
}
</script>