import { isEqual, get, isObject } from "lodash-es";
import { FlatMongoId } from "../types";

export function isEqualObject(value: any, other: any, paths: string[]): boolean {
  const anyNot = paths.some((path) =>
    !isEqual(get(value, path), get(other, path))
  );

  return !anyNot;
}

/** 只保留 mongo 物件 _id 部分
 * 
 * @example
 * ```
 * const data = {
 *   a: 1,
 *   b: {
 *     _id: '2'
 *   },
 *   c: [
 *     {
 *       data: 3,
 *       d: {
 *         _id: '4',
 *       }
 *     }
 *   ]
 * }
 * 
 * 變為
 * 
 * const data = {
 *   a: 1,
 *   b: '2',
 *   c: [
 *     {
 *       data: 3,
 *       d: '4'
 *     }
 *   ]
 * }
 * ```
 */
export function flatMongoId<T>(object: T): T extends object ? FlatMongoId<T> : T {
  // 一般型別
  if (!isObject(object)) {
    const value: any = object;
    return value;
  }

  // 矩陣
  if (Array.isArray(object)) {
    const result: any = object.map(flatMongoId);
    return result;
  }

  // 單層
  if (object && '_id' in object) {
    return object._id as any;
  }

  // 深層物件
  const result: any = {};

  Object.entries((object as any)).forEach(([key, value]: [string, any]) => {
    if (Array.isArray(value)) {
      const newValue = value.map(flatMongoId);
      console.log(`🚀 ~ newValue:`, newValue);
      result[key] = newValue;
      return;
    }

    if (typeof value === 'object') {
      if ('_id' in value) {
        result[key] = value._id;
        return;
      }

      const newValue = flatMongoId(value);
      result[key] = newValue;
      return;
    }

    result[key] = value;
  });

  return result;
}
