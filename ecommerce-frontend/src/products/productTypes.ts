export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  brand: string;
  mainCategory: ProductCategory['name'];
  otherCategory: Array<ProductCategory['name']>;
  price: number;
  vatType: number;
  inStock: boolean;
  stock: number;
  status: 'draft' | 'published' | 'hidden' | 'discontinued';
  images: ProductImage[];
  variants?: ProductVariant[];
  attributes: Record<string, string | number | boolean>; // {[key: string]: string | number | boolean}
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  parentSlug?: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  isMain: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  attributes: Record<string, string | number | boolean>; // {[key: string]: string | number | boolean}
  price: number;
  stock: number;
  ean?: string;
  images?: ProductImage[];
}
