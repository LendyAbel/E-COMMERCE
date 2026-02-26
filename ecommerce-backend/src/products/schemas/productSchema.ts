import { z } from 'zod';
import { categories } from '../../data/products-list';

const validCategorySlugs = categories.map(cat => cat.slug);

//HELPER
const optionalString = z.preprocess(
    val => (typeof val === 'string' && val.trim() === '' ? undefined : val),
    z.string().min(1).optional(),
);
const optionalNonNegativeNumber = z.preprocess(val => {
    if (val === undefined || val === null || val === '') return undefined;
    if (typeof val === 'number' && Number.isNaN(val)) return undefined;
    return val;
}, z.number().min(0).optional());

//Sub-schemas
export const ProductCategorySchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    slug: z.string().min(1),
    parentSlug: z.string().optional(),
});

export const ProductImageSchema = z.object({
    url: z.url('Image URL must be a valid URL'),
    alt: z.string().min(1, 'Image alt is required'),
    isMain: z.boolean().optional(),
});

export const ProductVariantSchema = z.object({
    id: z.string().min(1),
    sku: z.string().min(1),
    attributes: z.record(z.string(), z.string().or(z.number()).or(z.boolean())),
    price: z.number().positive('Variant price must be a positive'),
    stock: z.number().min(0, 'Variant stock cannot be negative'),
    ean: z.string().optional(),
    images: z.array(ProductImageSchema).optional(),
});

//Main Schema
export const ProductSchema = z.object({
    id: z.uuid(),
    sku: z.string().min(1, 'SKU is required'),
    name: z.string().min(1, 'Name is required'),
    shortDescription: z.string().min(1, 'Short description is required'),
    price: z.number().positive('Price must be positive'),
    vatType: z.number().positive('VAT type must be positive'),

    slug: optionalString,
    longDescription: optionalString,
    brand: optionalString,
    stock: optionalNonNegativeNumber,
    inStock: z.boolean().optional(),
    status: z.enum(['draft', 'published', 'hidden', 'discontinued']).optional(),
    mainCategory: z
        .string()
        .refine(
            slug => validCategorySlugs.includes(slug),
            `Invalid category. Valid: ${validCategorySlugs.join(', ')}`,
        )
        .optional(),
    otherCategory: z
        .array(
            z
                .string()
                .refine(
                    slug => validCategorySlugs.includes(slug),
                    `Invalid category. Valid: ${validCategorySlugs.join(', ')}`,
                ),
        )
        .optional(),
    images: z.array(ProductImageSchema).optional(),
    variants: z.array(ProductVariantSchema).optional(),
    attributes: z
        .record(z.string(), z.string().or(z.number()).or(z.boolean()))
        .optional(),
});

export const NewProductSchema = ProductSchema.omit({ id: true });

export type ProductCategory = z.infer<typeof ProductCategorySchema>;
export type ProductImage = z.infer<typeof ProductImageSchema>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;

export type Product = z.infer<typeof ProductSchema>;
export type NewProduct = z.infer<typeof NewProductSchema>;
