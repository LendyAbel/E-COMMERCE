import { z } from 'zod';
import {
    ProductCategorySchema,
    ProductImageSchema,
    ProductSchema,
    ProductVariantSchema,
} from './schemas/productSchema';

export const NewProductSchema = ProductSchema.omit({ id: true });

export type ProductCategory = z.infer<typeof ProductCategorySchema>;
export type ProductImage = z.infer<typeof ProductImageSchema>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;

export type Product = z.infer<typeof ProductSchema>;
export type NewProduct = z.infer<typeof NewProductSchema>;

export enum ProductStatus {
    Draft = 'draft',
    Published = 'published',
    Hidden = 'hidden',
    Discontinued = 'discontinued',
}
