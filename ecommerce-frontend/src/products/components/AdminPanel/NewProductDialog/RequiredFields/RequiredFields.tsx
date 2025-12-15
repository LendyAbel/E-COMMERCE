import { Box, Input } from '@mui/material';
import { useContext } from 'react';
import { NewProductContext } from '../../../../context/productContext';

const styleForm = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  marginTop: 2,
  marginButtom: 2,
};

const RequiredFields = () => {
  const context = useContext(NewProductContext);
  if (!context) {
    throw new Error(
      'RequiredFields must be used within NewProductContext.Provider'
    );
  }
  const { newProduct, setNewProduct } = context;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'vatType' ? Number(value) : value,
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
        name='vatType'
        placeholder='Vat Type'
        type='number'
        required
        value={newProduct.vatType || ''}
      />
    </Box>
  );
};

export default RequiredFields;
