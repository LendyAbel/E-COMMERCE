export interface Product {
    id: string;
    sku: string;
    name:string;
    slug: string;
    shortDescription: string;
    longDescription: string;
    brand: string;
    mainCategory: string;
    subCategory: string[];
    basePrice: number;
    taxRate: number;
    inStock: boolean;
    stockQuantity: number;
    status: 'draft' | 'published' | 'hidden' | 'discontinued';
    mainImage: string;
    galeryImages: string[];
}

export interface ProductVariant extends Product{
    variantOf: string;
    attributes: Record<string, string>;
    ean?: string;
}