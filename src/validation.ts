import { languageCodes } from './constants';

/**
 * Validates whether the specified code is a valid ISO 639-1 language code.
 */
export function isValidLanguageCode(code: string): boolean {
  return languageCodes.includes(code.toLowerCase());
}
