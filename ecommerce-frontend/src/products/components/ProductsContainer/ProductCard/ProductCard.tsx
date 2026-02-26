import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    IconButton,
    Typography,
} from '@mui/material';
import {
    Check,
    DoNotDisturb,
    ExpandLess,
    ExpandMore,
} from '@mui/icons-material';
import type { Product } from '../../../productTypes';
import { useState } from 'react';
import AddToCartButton from '../../../../cart/components/UI/AddToCartButton';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [expand, setExpand] = useState(false);

    const handleExpandClick = () => {
        setExpand(!expand);
    };
    return (
        <Card variant='outlined'>
            <CardHeader title={product.name} />

            <CardContent>
                {product.images?.[0] && (
                    <CardMedia
                        component='img'
                        sx={{ width: 150, objectFit: 'cover' }}
                        image={product.images[0].url}
                        alt={product.images[0].alt}
                    />
                )}
                <Typography>{product.shortDescription}</Typography>
                <Typography>Price: {product.price} €</Typography>
                {/* Imagen del producto */}
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expand}
                    aria-label='show more'
                >
                    {expand ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <Collapse in={expand} timeout={'auto'} unmountOnExit>
                    <Typography>{product.longDescription}</Typography>
                </Collapse>
            </CardContent>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <AddToCartButton productId={product.id} />
                <Typography
                    variant='body2'
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    stock:
                    {product.inStock ? (
                        <Check sx={{ color: 'green' }} />
                    ) : (
                        <DoNotDisturb sx={{ color: 'red' }} />
                    )}
                </Typography>
            </Box>
        </Card>
    );
};

export default ProductCard;
