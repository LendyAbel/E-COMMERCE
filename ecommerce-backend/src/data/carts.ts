import type { Cart } from '../cart/cartTypes';

export const carts: Cart[] = [
    {
        id: '1',
        userId: 'cad24f15-14da-46e3-8460-12ddfa2ee689',
        items: [
            { productId: 'prod-001', quantity: 2, price: 69.99 },
            { productId: 'prod-002', quantity: 10, price: 89.9 },
        ],
        cratedAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
    },
];
