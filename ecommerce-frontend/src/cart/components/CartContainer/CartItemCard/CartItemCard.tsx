import { Add, Delete, Remove } from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
} from '@mui/material';
import { fetchAllProducts } from '../../../../products/services/productServices';
import type { CartItem } from '../../../types';
import { useQuery } from '@tanstack/react-query';
import { useNotificationContext } from '../../../../notifications/hooks/useNotification';
import { useCart } from '../../../hooks/useCart';

interface CartItemCardProps {
    item: CartItem;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
    const { setNotification } = useNotificationContext();
    const { deleteItem } = useCart();
    //GET PRODUCT DETAIL
    const { data: productData } = useQuery({
        queryKey: ['products'],
        queryFn: fetchAllProducts,
        retry: 3,
    });
    const products = productData ?? [];
    const product = products.find(p => p.id === item.productId);

    //DECREMENT QTY
    const handleDecrement = (item: CartItem) => {
        console.log(item);
    };

    //INCREMENT QTY
    const handleIncrement = (item: CartItem) => {
        console.log(item);
    };

    //REMOVE ITEM
    const handleRemove = async (item: CartItem) => {
        try {
            await deleteItem(item);
            setNotification('Item removed from cart', 'success');
        } catch (error) {
            setNotification('Error removing item from cart', 'error');
            throw error;
        }
    };

    return (
        <Card
            className='cart-card'
            key={`${item.productId}-${item.variantId || 'base'}`}
        >
            {/* Imagen del producto */}
            {product?.images?.[0] && (
                <CardMedia
                    component='img'
                    sx={{ width: 150, objectFit: 'cover' }}
                    image={product.images[0].url}
                    alt={product.images[0].alt}
                />
            )}

            {/* CONTENT */}
            <CardContent sx={{ flex: 1 }}>
                <Typography variant='h6' gutterBottom>
                    {product?.name || 'Product'}
                </Typography>

                <Typography variant='body2' color='text.secondary' gutterBottom>
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
                    <Typography variant='body2'>Quantity:</Typography>

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
                <Typography variant='h6' color='primary' sx={{ mt: 2 }}>
                    Subtotal: €{(item.price * item.quantity).toFixed(2)}
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
};

export default CartItemCard;
