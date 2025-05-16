import { InjectionKey, Ref } from "vue";

export const injectionKey = Symbol('q-menu-hover') as InjectionKey<{
  bindSubmenu: (id: string) => void;
  unbindSubmenu: (id: string) => void;
  submenuList: Ref<string[]>;
}>