import { defineStore } from 'pinia';

import { ref } from 'vue';
import { Quasar } from 'quasar';
import i18n, { LangCode } from '../locales/i18n';

const langList = import.meta.glob([
  '../../node_modules/quasar/lang/en-US.mjs',
  '../../node_modules/quasar/lang/zh-TW.mjs',
]);

export const useMainStore = defineStore('main', () => {
  const locale = i18n.global.locale as unknown as `${LangCode}`;

  const data = ref('codfish');
  const lang = ref(locale);

  async function setLang(value: `${LangCode}`) {
    lang.value = value;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await langList[`../../node_modules/quasar/lang/${value}.mjs`]()
      Quasar.lang.set(data.default);
    } catch (error) {
      console.error(`${value} Quasar 語系載入失敗 : `, error);
      return Promise.reject(error);
    }
  }

  return {
    data,
    lang,
    setLang,
  }
})