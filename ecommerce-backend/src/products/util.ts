import { categories } from '../data/products-list';
import {
  NewProduct,
  ProductCategory,
  ProductImage,
  ProductStatus,
  ProductVariant,
} from './types';

// const assertNever = (value: never): never => {
//   throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
// };

// Type guards
// ===================
const isString = (value: unknown): value is string => typeof value === 'string';

const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && !Number.isNaN(value);

const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isStringNumberBoolean = (
  value: unknown
): value is string | number | boolean =>
  isString(value) || isNumber(value) || isBoolean(value);

const isProductCategory = (value: unknown): value is string => {
  if (!isString(value)) return false;
  return categories.some(category => category.slug === value);
};

const isProductStatus = (value: unknown): value is ProductStatus => {
  return Object.values(ProductStatus).includes(value as ProductStatus);
};

const isProductImage = (value: unknown): value is ProductImage => {
  if (!isRecord(value)) return false;
  if (!isString(value.url)) return false;
  if (!isString(value.alt)) return false;
  if ('isMain' in value && !isBoolean(value.isMain)) return false;
  return true;
};

const isProductVariant = (value: unknown): value is ProductVariant => {
  if (!isRecord(value)) return false;
  if (!isString(value.id)) return false;
  if (!isString(value.sku)) return false;
  if (!isRecord(value.attributes)) return false;

  for (const v of Object.values(value.attributes)) {
    if (!isStringNumberBoolean(v)) return false;
  }

  if (!isNumber(value.price)) return false;
  if (!isNumber(value.stock)) return false;

  if ('ean' in value && value.ean !== undefined && !isString(value.ean)) {
    return false;
  }

  if ('images' in value && value.images !== undefined) {
    if (!Array.isArray(value.images)) return false;
    for (const img of value.images) {
      if (!isProductImage(img)) return false;
    }
  }

  return true;
};

// Parsers
// ===================
const parseSku = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error('Invalid SKU: not a string');
  }
  return value;
};
const parseName = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error('Invalid Name: not a string');
  }
  return value;
};
const parseSlug = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error('Invalid Slug: not a string');
  }
  return value;
};
const parseShortDescription = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error('Invalid Short Description: not a string');
  }
  return value;
};
const parseLongDescription = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error('Invalid Long Description: not a string');
  }
  return value;
};
const parseBrand = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error('Invalid Brand: not a string');
  }
  return value;
};
const parseMainCategory = (value: unknown): ProductCategory['slug'] => {
  if (!value || !isString(value) || !isProductCategory(value)) {
    throw new Error(
      'Invalid Main Category: not a string or wrong category, must be one of: ' +
        categories.map(cat => cat.slug).join(', ')
    );
  }
  return value;
};
const parseOtherCategory = (value: unknown): string[] => {
  if (
    !value ||
    !Array.isArray(value) ||
    !value.every(isString) ||
    !value.every(isProductCategory)
  ) {
    throw new Error('Invalid Other Category: not an array of strings');
  }
  return value;
};
const parsePrice = (value: unknown): number => {
  if (!value || !isNumber(value)) {
    throw new Error('Invalid Price: not a number');
  }
  return value;
};
const parseVatType = (value: unknown): number => {
  if (!value || !isNumber(value)) {
    throw new Error('Invalid VatType: not a number');
  }
  return value;
};
const parseStock = (value: unknown): number => {
  if (value === undefined || value === null) {
    return 0;
  }
  if (!isNumber(value)) {
    throw new Error('Invalid Stock: not a number');
  }
  return value;
};
const parseStatus = (value: unknown): ProductStatus => {
  if (!value || !isProductStatus(value)) {
    throw new Error('Invalid Status: not a valid ProductStatus');
  }
  return value;
};
const parseImages = (value: unknown): ProductImage[] => {
  if (!value || !Array.isArray(value)) {
    throw new Error('Invalid Images: not an array');
  }
  value.forEach(img => {
    if (!isProductImage(img)) {
      throw new Error('Invalid Images: contains invalid image object');
    }
  });
  return value as ProductImage[];
};
const parseVariant = (value: unknown): ProductVariant[] => {
  if (!value || !Array.isArray(value)) {
    throw new Error('Invalid Variants: not an array');
  }
  value.forEach(variant => {
    if (!isProductVariant(variant)) {
      throw new Error('Invalid Variants: contains invalid variant object');
    }
  });
  return value as ProductVariant[];
};
const parseAttributes = (
  value: unknown
): Record<string, string | number | boolean> => {
  if (!value || !isRecord(value)) {
    throw new Error('Invalid Attributes: not an object');
  }
  const parsedAttributes: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(value)) {
    if (!isStringNumberBoolean(v)) {
      throw new Error(`Invalid attribute value for key "${k}"`);
    }
    parsedAttributes[k] = v;
  }
  return parsedAttributes;
};

//Converters
// ===================

export const toNewProduct = (object: unknown): NewProduct => {
  if (!isRecord(object)) {
    throw new Error('Invalid product payload: not an object');
  }

  if (
    'sku' in object &&
    'name' in object &&
    'shortDescription' in object &&
    'price' in object &&
    'vatType' in object
  ) {
    const newProduct: NewProduct = {
      sku: parseSku(object.sku),
      name: parseName(object.name),
      shortDescription: parseShortDescription(object.shortDescription),
      price: parsePrice(object.price),
      vatType: parseVatType(object.vatType),
    };
    if ('slug' in object) newProduct.slug = parseSlug(object.slug);
    if ('longDescription' in object)
      newProduct.longDescription = parseLongDescription(object.longDescription);
    if ('brand' in object) newProduct.brand = parseBrand(object.brand);
    if ('mainCategory' in object)
      newProduct.mainCategory = parseMainCategory(object.mainCategory);
    if ('otherCategory' in object)
      newProduct.otherCategory = parseOtherCategory(object.otherCategory);
    if ('stock' in object) newProduct.stock = parseStock(object.stock);
    if ('status' in object) newProduct.status = parseStatus(object.status);
    if ('images' in object) newProduct.images = parseImages(object.images);
    if ('variants' in object)
      newProduct.variants = parseVariant(object.variants);
    if ('attributes' in object)
      newProduct.attributes = parseAttributes(object.attributes);

    return newProduct;
  }
  throw new Error('Invalid product payload: some fields are missing');
};
