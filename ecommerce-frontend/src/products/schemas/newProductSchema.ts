import { z } from 'zod';
import { PRODUCT_STATUS } from '../productTypes';

export const newProductSchema = z.object({
    //REQUIERD FIELDS
    sku: z.string().min(1, 'SKU is required'),
    name: z.string().min(1, 'Name is required'),
    shortDescription: z.string().min(1, 'Short description is required'),
    price: z.number().positive('Price is requierd and must be positive'),
    vatType: z.number().positive('VAT is requierd and must be positive'),

    //OPTIONALS FIELDS
    slug: z.string().optional(),
    longDescription: z.string().optional(),
    brand: z.string().optional(),
    stock: z.number().min(0).optional(),
    mainCategory: z.string().optional(),
    otherCategory: z.array(z.string()).optional(),
    status: z.enum(PRODUCT_STATUS).optional(),
});

export type NewProductFormValues = z.infer<typeof newProductSchema>;
