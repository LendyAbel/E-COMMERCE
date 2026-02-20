import { Box, Typography } from '@mui/material';
import { useCart } from '../../hooks/useCart';
import CartItemCard from './CartItemCard/CartItemCard';
import OrderSummary from './OrderSummary/OrderSummary';

const CartContainer = () => {
    const { cart } = useCart();

    return (
        <Box component={'div'} className='cart-container'>
            {/* CART LIST */}
            <Box>
                <Typography variant='h4' gutterBottom>
                    Shopping Cart ({cart.totalItems} items)
                </Typography>

                {cart.items.map(item => (
                    <div key={item.productId}>
                        <CartItemCard item={item} />
                    </div>
                ))}
            </Box>

            {/* SUMMARY */}
            <OrderSummary cart={cart} />
        </Box>
    );
};

export default CartContainer;
