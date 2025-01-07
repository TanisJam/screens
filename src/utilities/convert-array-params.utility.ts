import { GetDisplaysParams } from '@/models/display.model';

/**
 * Converts array parameters into a flat key-value object with indexed keys.
 * For example, if params has an array field 'ids' with values [1,2],
 * the result will contain 'ids[0]=1' and 'ids[1]=2'
 *
 * @param params - The object containing parameters to convert
 * @param arrayFields - Array of field names that should be treated as arrays
 * @returns A flattened object where array values are converted to indexed properties
 *
 * @example
 * ```typescript
 * const params = { ids: [1, 2, 3] };
 * const result = convertArrayParams(params, ['ids']);
 * // Result: { 'ids[0]': 1, 'ids[1]': 2, 'ids[2]': 3 }
 * ```
 */
export const convertArrayParams = (
  params: GetDisplaysParams,
  arrayFields: (keyof GetDisplaysParams)[]
) => {
  const result: Record<string, string | number> = {};
  for (const field of arrayFields) {
    const value = params[field];
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        result[`${field}[${index}]`] = item;
      });
    }
  }
  return result;
};
