import { isEqual } from 'lodash-es';

/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 * Note: This method supports comparing arrays, array buffers, booleans, date objects, error objects,
 * maps, numbers, Object objects, regexes, sets, strings, symbols, and typed arrays.
 * Object objects are compared by their own, not inherited, enumerable properties.
 * Functions and DOM nodes are compared by strict equality, i.e. ===.
 */
export function mwIsEqualHelper(value: unknown, other: unknown): boolean {
  return isEqual(value, other);
}
