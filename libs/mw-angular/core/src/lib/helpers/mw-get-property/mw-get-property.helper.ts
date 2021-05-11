import { get } from 'lodash-es';

/**
 * Gets the value at path of object.
 * If the resolved value is undefined, the defaultValue is returned in its place.
 */
export function mwGetPropertyHelper<Result, Default = undefined>(
  object: unknown,
  path: string | string[],
  defaultValue?: Default,
): Result | Default {
  return get(object, path, defaultValue);
}
