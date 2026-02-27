/**
 * Type-safe i18n utilities for Playwright tests. Uses locale JSON to provide
 * autocomplete-friendly translation keys and optional pluralization.
 * @module utils/i18n
 */
import en from '../lang/en.json' with { type: 'json' };

/**
 * Recursive type that flattens a nested object into dot-notation string paths.
 * Used to derive valid translation keys from the locale JSON (e.g. "CART.ITEM_COUNT_zero" | "TOASTER.PRODUCT_ADDED").
 * @internal
 */
type PathsToFields<T> = T extends string
  ? ''
  : {
      [K in keyof T & string]: `${K}${PathsToFields<T[K]> extends '' ? '' : '.'}${PathsToFields<T[K]>}`;
    }[keyof T & string];

/**
 * Union of all valid translation keys inferred from the locale JSON.
 * Use this type for parameters that accept only known keys (e.g. in `translate` or page `t()`).
 */
export type TranslationKey = PathsToFields<typeof en>;

const resources = { en };

/**
 * Recursive shape of a locale dictionary: values are either strings or nested objects.
 * @internal
 */
type TranslationResource = { [key: string]: string | TranslationResource };

/**
 * Returns the localized string for a translation key. Supports pluralization via optional count
 * (resolves _zero / _one / _other suffixes) and replaces {{count}} in the message.
 * @param key - Type-safe key from the locale JSON (e.g. 'TOASTER.PRODUCT_ADDED', 'CART.ITEM_COUNT_one')
 * @param count - Optional count for pluralized messages; also used for {{count}} replacement
 * @returns The translated string for the current locale (from APP_LOCALE, default 'en')
 */
export const translate = (key: TranslationKey, count?: number): string => {
  const locale = (process.env.APP_LOCALE || 'en') as keyof typeof resources;
  const dict = resources[locale] as unknown as TranslationResource;

  /**
   * Resolves a dot-notation path in a nested object (e.g. "CART.ITEM_COUNT_one").
   * @param obj - Root object (locale dict)
   * @param path - Dot-separated path; plural suffixes like _zero, _one, _other are part of the path
   * @returns The value at that path or undefined
   */
  const getNestedValue = (obj: unknown, path: string): unknown => {
    return path.split('.').reduce((acc, part) => acc && (acc as Record<string, unknown>)[part], obj);
  };

  const baseValue = getNestedValue(dict, key);

  // Logic for plural suffixes (_zero, _one, _other)
  let message = baseValue;
  if (count !== undefined) {
    if (count === 0) message = getNestedValue(dict, `${key}_zero`) || baseValue;
    else if (count === 1) message = getNestedValue(dict, `${key}_one`) || baseValue;
    else message = getNestedValue(dict, `${key}_other`) || baseValue;
  }

  // Final string replacement for {{count}} variables
  if (typeof message === 'string') {
    return message.replace('{{count}}', String(count ?? 0));
  }

  return String(message || key);
};
