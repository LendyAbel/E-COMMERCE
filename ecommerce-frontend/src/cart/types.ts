export interface CartItem {
    productId: string;
    variantId?: string;
    quantity: number;
    price: number;
}

export type NewCartItem = Omit<CartItem, 'price'>;

export interface ServerCart {
    id: string;
    userId: string;
    items: CartItem[];
    cratedAt: Date;
    updatedAt: Date;
}

export interface Cart {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}
