import en from '../lang/en.json' with { type: 'json' };

const resources = { en };

// Define a recursive type for nested JSON to avoid 'any'
type TranslationResource = { [key: string]: string | TranslationResource };

export const translate = (key: string, count?: number): string => {
  const locale = (process.env.APP_LOCALE || 'en') as keyof typeof resources;

  // Cast to unknown first, then to our strict interface to satisfy ESLint
  const dict = resources[locale] as unknown as TranslationResource;

  // A type-safe helper to navigate paths like "CART.ITEM_COUNT"
  const getNestedValue = (obj: unknown, path: string): unknown =>
    path.split('.').reduce((acc, part) => acc && (acc as Record<string, unknown>)[part], obj);

  const baseValue = getNestedValue(dict, key);

  // Logic for plural suffixes
  let message = baseValue;
  if (count === 0) message = getNestedValue(dict, `${key}_zero`) || baseValue;
  else if (count === 1) message = getNestedValue(dict, `${key}_one`) || baseValue;
  else message = getNestedValue(dict, `${key}_other`) || baseValue;

  return typeof message === 'string' ? message.replace('{{count}}', String(count ?? 0)) : key;
};
