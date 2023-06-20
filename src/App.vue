<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex gap-10">
      <q-select
        v-model="lang"
        :options="langOptions"
        label="目前語系"
        filled
        emit-value
        map-options
        style="min-width: 150px"
      />

      <q-btn
        icon="home"
        class="w-40"
        no-caps
      >
        {{ t('hello') }} {{ store.data }}
      </q-btn>
    </div>

    <div class="text-xl">
      x : {{ x }}、y : {{ y }}
    </div>

    <div class="flex">
      <div class="btn">
        Shortcuts Class Btn（開啟 UnoCSS 即可看見效果）
      </div>
    </div>

    <q-date v-model="date" />
  </div>

  <router-view />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import quasarLangs from 'quasar/lang/index.json';
import { LangCode } from './locales/i18n';

import { useMeta } from 'quasar';
import { useMouse } from '@vueuse/core';
import { useMainStore } from './stores/main.store';
import { useLang } from './composables/use-lang';

const store = useMainStore();
const { x, y } = useMouse();
const { t } = useLang();

const date = ref();

const lang = ref(store.lang);
watch(lang, (value) => store.setLang(value));

const langs = quasarLangs.filter((lang) =>
  (Object.values(LangCode) as string[]).includes(lang.isoName)
);
const langOptions = langs.map((lang) => ({
  label: lang.nativeName, value: lang.isoName
}));


useMeta(() => ({
  title: `Vue Quasar TypeScript Template Web`,
  titleTemplate: (title) => `${title} v${import.meta.env.PACKAGE_VERSION}`,
  htmlAttr: {
    lang: lang.value
  }
}));

console.log(`log 一下`);
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
