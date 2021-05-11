import { uniqueId } from 'lodash-es';

/**
 * Generates a unique ID.
 * If prefix is given, the ID is appended to it.
 */
export function mwGenerateUniqueIdHelper(prefix?: string): string {
  return uniqueId(prefix);
}
