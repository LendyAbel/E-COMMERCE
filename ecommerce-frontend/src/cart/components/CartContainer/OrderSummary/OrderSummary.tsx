import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import { Link } from 'react-router';
import type { Cart } from '../../../types';

type OrderSummaryProps = {
    cart: Cart;
};

const OrderSummary = ({ cart }: OrderSummaryProps) => {
    return (
        <Paper
            elevation={3}
            sx={{
                padding: 3,
                position: 'sticky',
                top: 20,
                height: 'fit-content',
            }}
        >
            <Typography variant='h5' gutterBottom>
                Order Summary
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Detalles */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                }}
            >
                <Typography variant='body1'>Items:</Typography>
                <Typography variant='body1'>{cart.totalItems}</Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                }}
            >
                <Typography variant='body1'>Subtotal:</Typography>
                <Typography variant='body1'>
                    €{cart.totalPrice.toFixed(2)}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                }}
            >
                <Typography variant='body1'>Shipping:</Typography>
                <Typography variant='body1' color='success.main'>
                    FREE
                </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Total */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 3,
                }}
            >
                <Typography variant='h6'>Total:</Typography>
                <Typography variant='h6' color='primary'>
                    €{cart.totalPrice.toFixed(2)}
                </Typography>
            </Box>

            {/* Botones */}
            <Button variant='contained' fullWidth size='large' sx={{ mb: 2 }}>
                Proceed to Checkout
            </Button>
            <Link to={'/products'}>
                <Button variant='outlined' fullWidth>
                    Continue Shopping
                </Button>
            </Link>
        </Paper>
    );
};

export default OrderSummary;
