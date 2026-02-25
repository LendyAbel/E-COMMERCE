export interface Product {
  id: string;
  sku: string;
  name: string;
  slug?: string | undefined;
  shortDescription: string;
  longDescription?: string | undefined;
  brand?: string | undefined;
  mainCategory?: ProductCategory['slug'] | undefined;
  otherCategory?: Array<ProductCategory['slug']> | undefined;
  price: number;
  vatType: number;
  inStock?: boolean | undefined;
  stock?: number | undefined;
  status?: 'draft' | 'published' | 'hidden' | 'discontinued' | undefined;
  images?: ProductImage[] | undefined;
  variants?: ProductVariant[] | undefined;
  attributes?: Record<string, string | number | boolean> | undefined; // {[key: string]: string | number | boolean}
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  parentSlug?: string | undefined;
}

export interface ProductImage {
  url: string;
  alt: string;
  isMain?: boolean | undefined;
}
 export enum ProductStatus {
  Draft = 'draft',
  Published = 'published',
  Hidden = 'hidden',
  Discontinued = 'discontinued',
 }

export interface ProductVariant {
  id: string;
  sku: string;
  attributes: Record<string, string | number | boolean>; // {[key: string]: string | number | boolean}
  price: number;
  stock: number;
  ean?: string | undefined;
  images?: ProductImage[] | undefined;
}

export type NewProduct = Omit<Product, 'id'>;
