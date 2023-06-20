
export type ToUpdateParams<T> =
  T extends Array<any> ? FlatMongoId<T> :
  /** 特殊物件要轉換成 mongo id */
  T extends { _id: string } ? string :
  T extends object ? { [K in keyof T]?: ToUpdateParams<T[K]> } :
  T;

export type FlatMongoId<T> =
  T extends { _id: string } ? string :
  T extends object ? { [K in keyof T]: FlatMongoId<T[K]> } :
  T;
