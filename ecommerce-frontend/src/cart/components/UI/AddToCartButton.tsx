import { ShoppingCart } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNotificationContext } from '../../../notifications/hooks/useNotification';
import { useCart } from '../../hooks/useCart';

type AddToCartButtonProps = {
    productId: string;
    variantId?: string;
    quantity?: number;
    disabled?: boolean;
};

const AddToCartButton = ({
    productId,
    variantId,
    quantity = 1,
    disabled,
}: AddToCartButtonProps) => {
    const { setNotification } = useNotificationContext();
    const { addItem } = useCart();

    const handleClick = async () => {
        try {
            await addItem({ productId, variantId, quantity });
            setNotification('Adding to cart', 'info');
        } catch (error) {
            console.error(error);
            setNotification('Error adding to cart', 'error');
        }
    };
    return (
        <Button
            variant='contained'
            startIcon={<ShoppingCart />}
            disabled={disabled}
            onClick={handleClick}
        >
            Add to Cart
        </Button>
    );
};

export default AddToCartButton;
