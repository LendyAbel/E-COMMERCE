import { Box, Input } from '@mui/material';
import { useContext } from 'react';
import { NewProductContext } from '../../../../context/productContext';
import type { NewProduct } from '../../../../productTypes';

const RequiredFields = () => {
  const context = useContext(NewProductContext);
  if (!context) {
    throw new Error(
      'RequiredFields must be used within NewProductContext.Provider'
    );
  }
  const { newProduct, updateField } = context;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'price' || name === 'vatType') {
      updateField(name as 'price' | 'vatType', Number(value));
      return;
    }
    updateField(name as keyof NewProduct, value);
  };

  return (
    <Box className='input-container' component='div' onChange={handleChange}>
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
