import { InjectionKey, Ref } from "vue";

export interface Submenu {
  id: string;
}

export const injectionKey = Symbol('q-menu-hover') as InjectionKey<{
  bindSubmenu: (data: { id: string }) => void;
  unbindSubmenu: (id: string) => void;
  submenuList: Ref<Submenu[]>;
}>