export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  cratedAt: Date;
  updatedAt: Date;
}

export type NewCartItem = Omit<CartItem, 'price'>;

export type UpdateCartItem = Partial<Pick<CartItem, 'quantity'>>;
