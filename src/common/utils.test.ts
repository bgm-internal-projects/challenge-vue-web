import { describe, expect, it } from 'vitest';
import { flatMongoId } from './utils';

describe.only("flatMongoId", () => {
  it("集合物件，返回 _id", () => {
    const result = flatMongoId({ _id: '123456' });
    expect(result).toEqual('123456');
  });

  it("string，返回自身", () => {
    const result = flatMongoId('123456');
    expect(result).toEqual('123456');
  });

  it("number，返回自身", () => {
    const result = flatMongoId(123456);
    expect(result).toEqual(123456);
  });

  it("深層物件", () => {
    const result = flatMongoId({
      a: {
        b: {
          c: {
            d: {
              _id: '123456'
            }
          }
        }
      }
    });
    expect(result.a.b.c.d).toEqual('123456');
  });

  it("集合矩陣", () => {
    const result = flatMongoId([
      { _id: '1' },
      { _id: '2' },
    ]);
    expect(result).toEqual(['1', '2']);
  });

  it("深層集合矩陣", () => {
    const result = flatMongoId({
      a: [
        { _id: '1' },
        { _id: '2' },
      ]
    });
    expect(result.a).toEqual(['1', '2']);
  });
});