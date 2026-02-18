import express, { NextFunction, Request, Response } from 'express';
import { authenticateMiddleware } from '../../users/auth/authenticateMiddleware';
import { Cart, CartItem, NewCartItem } from '../types';
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

// // POST /api/cart/itmes (add item)
// router.post(
//     '/itmes',
//     async (
//         req: Request<unknown, Cart, NewCartItem>,
//         res: Response<Cart>,
//         next: NextFunction,
//     ) => {
//         try {
//             const userId = req.user!.id;
//             const item = req.body;
//             const cart = cartServices.addItemToCart(userId, item);
//             res.status(201).json(cart);
//         } catch (error) {
//             next(error);
//         }
//     },
// );

// // PUT /api/cart/items/:productId (update item)
// router.put(
//     '/itmes/:productId',
//     async (
//         req: Request<string, Cart, { variantId?: string; quantity: number }>,
//         res: Response<Cart>,
//         next: NextFunction,
//     ) => {
//         try {
//             const userId = req.user!.id;
//             const productId = req.params;
//             const { variantId, quantity } = req.body;

//             const cart = cartServices.updateCartItem(
//                 userId,
//                 productId,
//                 variantId,
//                 quantity,
//             );

//             res.json(cart);
//         } catch (error) {
//             next(error);
//         }
//     },
// );

// // DELETE /api/cart/items/:productId (delete item)
// router.delete(
//     '/items/:productId',
//     async (
//         req: Request<string, Cart, unknown, { variantId?: string }>,
//         res: Response<Cart>,
//         next: NextFunction,
//     ) => {
//         try {
//             const userId = req.user!.id;
//             const productId = req.params;
//             const { variantId } = req.query;

//             const cart = cartServices.removeCartItem(
//                 userId,
//                 productId,
//                 variantId as string | undefined,
//             );
//             res.json(cart);
//         } catch (error) {
//             next(error);
//         }
//     },
// );

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

export default router