import { Add } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { useNewProductDialogContext } from '../../../hooks/useNewProductDialog';

const AddProductButton = () => {
  const { open } = useNewProductDialogContext();

  return (
    <Fab
      sx={{ position: 'absolute' }}
      className='add-product-button'
      color='primary'
      aria-label='add'
      onClick={open}
    >
      <Add /> NEW
    </Fab>
  );
};

export default AddProductButton;
