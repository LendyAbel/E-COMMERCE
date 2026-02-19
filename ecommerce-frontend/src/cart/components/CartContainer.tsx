import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    IconButton,
    Paper,
    Typography,
} from '@mui/material';
import { useCart } from '../hooks/useCart';
import { fetchAllProducts } from '../../products/services/productServices';
import type { Product } from '../../products/productTypes';
import { useQuery } from '@tanstack/react-query';
import { Add, Delete, Remove } from '@mui/icons-material';
import type { CartItem } from '../types';
import { Link } from 'react-router';

const CartContainer = () => {
    const { cart } = useCart();

    //FETCH PRODUCTS
    const { data: productData } = useQuery({
        queryKey: ['products'],
        queryFn: fetchAllProducts,
        retry: 3,
    });
    const products = productData ?? [];

    //AUX FUNCTION TO GET PRODUCT DETAIL
    const getProductDetail = (productId: string): Product | undefined => {
        return products.find(p => p.id === productId);
    };

    const handleDecrement = (item: CartItem) => {
        console.log(item);
    };

    const handleIncrement = (item: CartItem) => {
        console.log(item);
    };

    const handleRemove = (item: CartItem) => {
        console.log(item);
    };

    return (
        <Box
            sx={{
                maxWidth: 1200,
                margin: '0 auto',
                padding: 3,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
                gap: 3,
            }}
        >
            {/* CART LIST */}
            <Box>
                <Typography variant='h4' gutterBottom>
                    Shopping Cart ({cart.totalItems} items)
                </Typography>

                {cart.items.map(item => {
                    const product = getProductDetail(item.productId);
                    return (
                        <Card
                            key={`${item.productId}-${item.variantId || 'base'}`}
                            sx={{
                                mb: 2,
                                display: 'flex',
                                position: 'relative',
                            }}
                        >
                            {/* Imagen del producto */}
                            {/* {product?.images?.[0] && (
                                <CardMedia
                                    component='img'
                                    sx={{ width: 150, objectFit: 'cover' }}
                                    image={product.images[0].url}
                                    alt={product.images[0].alt}
                                />
                            )} */}

                            {/* CONTENT */}
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant='h6' gutterBottom>
                                    {product?.name || 'Product'}
                                </Typography>

                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    gutterBottom
                                >
                                    {product?.shortDescription}
                                </Typography>

                                {item.variantId && (
                                    <Typography
                                        variant='caption'
                                        color='primary'
                                        display='block'
                                    >
                                        Variant ID: {item.variantId}
                                    </Typography>
                                )}

                                {/* PRICE */}
                                <Typography variant='body1' sx={{ mt: 1 }}>
                                    Unit Price: €{item.price.toFixed(2)}
                                </Typography>

                                {/* AMMOUNT SELECTOR */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        mt: 2,
                                    }}
                                >
                                    <Typography variant='body2'>
                                        Quantity:
                                    </Typography>

                                    <IconButton
                                        size='small'
                                        onClick={() => handleDecrement(item)}
                                        disabled={item.quantity <= 1}
                                        sx={{
                                            border: '1px solid',
                                            borderColor: 'divider',
                                        }}
                                    >
                                        <Remove fontSize='small' />
                                    </IconButton>

                                    <Typography
                                        variant='body1'
                                        sx={{
                                            minWidth: 40,
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {item.quantity}
                                    </Typography>

                                    <IconButton
                                        size='small'
                                        onClick={() => handleIncrement(item)}
                                        sx={{
                                            border: '1px solid',
                                            borderColor: 'divider',
                                        }}
                                    >
                                        <Add fontSize='small' />
                                    </IconButton>
                                </Box>

                                {/* SUBTOTAL */}
                                <Typography
                                    variant='h6'
                                    color='primary'
                                    sx={{ mt: 2 }}
                                >
                                    Subtotal: €
                                    {(item.price * item.quantity).toFixed(2)}
                                </Typography>
                            </CardContent>

                            {/* Botón eliminar (esquina superior derecha) */}
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                }}
                                color='error'
                                onClick={() => handleRemove(item)}
                            >
                                <Delete />
                            </IconButton>
                        </Card>
                    );
                })}
            </Box>

            {/* Resumen del carrito (sidebar) */}
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
                <Button
                    variant='contained'
                    fullWidth
                    size='large'
                    sx={{ mb: 2 }}
                >
                    Proceed to Checkout
                </Button>
                <Link to={'/products'}>
                    <Button variant='outlined' fullWidth>
                        Continue Shopping
                    </Button>
                </Link>
            </Paper>
        </Box>
    );
};

export default CartContainer;
