import { Badge, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useCart } from '../hooks/useCart';

const CartBadge = () => {
    const { cart } = useCart();
    const navigate = useNavigate();

    return (
        <IconButton onClick={() => navigate('/cart')} color='inherit'>
            <Badge badgeContent={cart.totalItems} color='error'>
                <ShoppingCart />
            </Badge>
        </IconButton>
    );
};

export default CartBadge;
