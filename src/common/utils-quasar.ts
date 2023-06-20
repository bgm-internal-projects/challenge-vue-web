import { DialogChainObject } from "quasar";

/** 可以將 Quasar Dialog Plugin 包裝為 Promise */
export function dialogPromisify<T = void>(dialog: DialogChainObject) {
  return new Promise<T>((resolve, reject) => {
    dialog
      .onOk(resolve)
      .onCancel(() => reject('cancel'))
      .onDismiss(() => reject('dismiss'));
  });
}