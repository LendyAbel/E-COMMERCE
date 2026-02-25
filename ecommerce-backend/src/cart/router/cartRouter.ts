import express, { NextFunction, Request, Response } from 'express';
import { authenticateMiddleware } from '../../users/auth/authenticateMiddleware';
import { Cart, NewCartItem } from '../cartTypes';
import cartServices from '../services/cartServices';

const router = express.Router();

//All routes needs authentication
router.use(authenticateMiddleware);

// GET /api/cart (get cart)
router.get(
    '/',
    async (req: Request, res: Response<Cart>, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const cart = cartServices.getUserCart(userId);
            res.json(cart);
        } catch (error) {
            next(error);
        }
    },
);

// POST /api/cart/itmes (add item)
router.post(
    '/items',
    async (
        req: Request<unknown, Cart, NewCartItem>,
        res: Response<Cart>,
        next: NextFunction,
    ) => {
        try {
            const userId = req.user!.id;
            const item = req.body;
            const cart = cartServices.addItemToCart(userId, item);
            res.status(201).json(cart);
        } catch (error) {
            next(error);
        }
    },
);

// PUT /api/cart/items/:productId (update qty item)
router.put(
    '/items/:productId',
    async (
        req: Request<
            { productId: string },
            Cart,
            { quantity: number },
            { variantId?: string }
        >,
        res: Response<Cart>,
        next: NextFunction,
    ) => {
        try {
            const userId = req.user!.id;
            const { productId } = req.params;
            const { quantity } = req.body;
            const { variantId } = req.query;

            const cart = cartServices.updateQtyCartItem(
                userId,
                productId,
                quantity,
                variantId,
            );

            res.json(cart);
        } catch (error) {
            next(error);
        }
    },
);

// DELETE /api/cart/items/:productId (delete item)
router.delete(
    '/items/:productId',
    async (
        req: Request<
            { productId: string },
            Cart,
            unknown,
            { variantId?: string }
        >,
        res: Response<Cart>,
        next: NextFunction,
    ) => {
        try {
            const userId = req.user!.id;
            const { productId } = req.params;
            const { variantId } = req.query;

            const cart = cartServices.removeCartItem(
                userId,
                productId,
                variantId as string | undefined,
            );
            res.json(cart);
        } catch (error) {
            next(error);
        }
    },
);

// //DELETE /api/cart/  (clear cart)
// router.delete(
//     '',
//     async (req: Request, res: Response<Cart>, next: NextFunction) => {
//         try {
//             const userId = req.user!.id;
//             const cart = cartServices.clearCart(userId);
//             res.json(cart);
//         } catch (error) {
//             next(error);
//         }
//     },
// );

// //POST /api/cart/merge (merge guest cart)
// router.post(
//     '/merge',
//     async (
//         req: Request<unknown, Cart, { guestItems: CartItem[] }>,
//         res: Response<Cart>,
//         next: NextFunction,
//     ) => {
//         try {
//             const userId = req.user!.id;
//             const { guestItems } = req.body;
//             const cart = cartServices.mergeGuestCart(userId, guestItems);
//             res.json(cart);
//         } catch (error) {
//             next(error);
//         }
//     },
// );

export default router;
