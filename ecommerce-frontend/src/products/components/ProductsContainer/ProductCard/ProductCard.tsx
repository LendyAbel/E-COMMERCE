import {
    Card,
    CardContent,
    CardHeader,
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
            <Typography>
                {' '}
                stock:
                {product.inStock ? (
                    <Check sx={{ color: 'green' }} />
                ) : (
                    <DoNotDisturb sx={{ color: 'red' }} />
                )}
            </Typography>

            <CardContent>
                <Typography>{product.shortDescription}</Typography>
                <Typography>Price: {product.price} €</Typography>
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
            <AddToCartButton productId={product.id} />
        </Card>
    );
};

export default ProductCard;
