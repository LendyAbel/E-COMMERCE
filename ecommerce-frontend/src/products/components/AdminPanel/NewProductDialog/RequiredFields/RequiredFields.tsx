import { Box, Input } from '@mui/material';
import type { NewProduct } from '../../../../productTypes';

interface RequiredFieldsProps {
  newProduct: NewProduct;
  setNewProduct: React.Dispatch<React.SetStateAction<NewProduct>>;
}

const styleForm = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  marginTop: 2,
  marginButtom: 2,
};

const RequiredFields = ({ newProduct, setNewProduct }: RequiredFieldsProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewProduct(prev => ({
      ...prev,
      [name]:
        name === 'price' || name === 'vat'
          ? value === ''
            ? ''
            : Number(value)
          : value,
    }));
  };

  return (
    <Box sx={styleForm} component='div' onChange={handleChange}>
      <Input
        name='sku'
        placeholder='SKU'
        required
        value={newProduct.sku || ''}
      />
      <Input
        name='name'
        placeholder='Name'
        required
        value={newProduct.name || ''}
      />
      <Input
        name='shortDescription'
        placeholder='Short Description'
        required
        value={newProduct.shortDescription || ''}
      />
      <Input
        name='price'
        placeholder='Price'
        type='number'
        required
        value={newProduct.price || ''}
      />
      <Input
        name='vat'
        placeholder='VAT Type'
        type='number'
        required
        value={newProduct.vatType || ''}
      />
    </Box>
  );
};

export default RequiredFields;
