import { carts } from '../../data/carts';
import { products } from '../../data/products-list';
import { throwAppError } from '../../utils/errorMiddleware';
import { Cart, NewCartItem } from '../cartTypes';
import { v4 as uuid } from 'uuid';

const getUserCart = (userId: string): Cart => {
    let cart = carts.find(cart => cart.userId === userId);

    if (!cart) {
        cart = {
            id: uuid(),
            userId,
            items: [],
            cratedAt: new Date(),
            updatedAt: new Date(),
        };
        carts.push(cart);
    }
    return cart;
};

const addItemToCart = (userId: string, item: NewCartItem): Cart => {
    const cart = getUserCart(userId);

    //Checking if product exist
    const product = products.find(product => product.id === item.productId);
    if (!product) {
        throwAppError(`Product with id: ${item.productId} not found`, 404);
    }

    //Establish price (variant or product base)
    let price = product.price;
    if (item.variantId) {
        const variant = product.variants?.find(
            variant => variant.id === item.variantId,
        );
        if (!variant) {
            throwAppError(`Variant with id: ${item.variantId} not found`, 404);
        }
        price = variant.price;
    }

    //Find if item already exist
    const existingItem = cart.items.find(
        i => i.productId === item.productId && i.variantId === item.variantId,
    );
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.items.push({ ...item, price });
    }

    cart.updatedAt = new Date();
    return cart;
};

const updateQtyCartItem = (
    userId: string,
    productId: string,
    quantity: number,
    variantId?: string | undefined,
) => {
    const cart = getUserCart(userId);

    const item = cart.items.find(
        i => i.productId === productId && i.variantId === variantId,
    );
    if (!item) {
        throwAppError(`Item with id: ${productId} not found in cart`, 404);
    }

    if (quantity <= 0) {
        cart.items = cart.items.filter(
            i => !(i.productId === productId && i.variantId === variantId),
        );
    } else {
        item.quantity = quantity;
    }

    cart.updatedAt = new Date();
    return cart;
};

const removeCartItem = (
    userId: string,
    productId: string,
    variantId?: string,
): Cart => {
    const cart = getUserCart(userId);

    cart.items = cart.items.filter(
        i => !(i.productId === productId && i.variantId === variantId),
    );

    cart.updatedAt = new Date();
    return cart;
};

// const clearCart = (userId: string): Cart => {
//     const cart = getUserCart(userId);

//     cart.items = [];
//     cart.updatedAt = new Date();

//     return cart;
// };

// //For migrate cart from gues to user
// const mergeGuestCart = (userId: string, guestItems: CartItem[]): Cart => {
//     const cart = getUserCart(userId);

//     guestItems.forEach(guestItem => {
//         const existingItem = cart.items.find(
//             i =>
//                 i.productId === guestItem.productId &&
//                 i.variantId === guestItem.variantId,
//         );
//         if (existingItem) {
//             existingItem.quantity += guestItem.quantity;
//         } else {
//             addItemToCart(userId, guestItem);
//         }
//     });
//     return cart;
// };

export default {
    getUserCart,
    addItemToCart,
    removeCartItem,
    updateQtyCartItem,
    // clearCart,
    // mergeGuestCart,
};
