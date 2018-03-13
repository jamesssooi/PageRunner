/** ========================================================================= *\
 * @module Utilities
 * ========================================================================== */

/** findInArray returns the value of the first element that satisfies the predicate. */
export function findInArray<T>(arr: T[], predicate: (val: T) => boolean): T | undefined {
  arr.forEach((val) => {
    if (predicate(val)) {
      return val;
    }
  });
  return undefined;
}
