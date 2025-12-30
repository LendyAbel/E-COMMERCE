import { Box, Input } from '@mui/material';
import {
  PRODUCT_STATUS,
  type NewProduct,
  type ProductCategory,
  type ProductStatus,
} from '../../../../productTypes';

import SimpleSelect from '../../../UI/Inputs/SimpleSelect';
import MultipleSelect from '../../../UI/Inputs/MultipleSelect';

import { useContext } from 'react';
import { NewProductContext } from '../../../../context/productContext';

const categories: ProductCategory[] = [
  {
    id: 'cat-001',
    name: 'Electrónica',
    slug: 'electronica',
  },
  {
    id: 'cat-002',
    name: 'Periféricos',
    slug: 'perifericos',
    parentSlug: 'electronica',
  },
  {
    id: 'cat-003',
    name: 'Audio',
    slug: 'audio',
    parentSlug: 'electronica',
  },
  {
    id: 'cat-004',
    name: 'Gaming',
    slug: 'gaming',
    parentSlug: 'electronica',
  },
];
const categoriesOptions = categories.map(cat => cat.slug);

const statusOptions: ProductStatus[] = [...PRODUCT_STATUS];

const OptionalFields = () => {
  const context = useContext(NewProductContext);
  if (!context) {
    throw new Error(
      'OptionalFields must be used within NewProductContext.Provider'
    );
  }
  const { newProduct, updateField } = context;

  // SELECT simple: mainCategory
  const handleMainCategoryChange = (value: typeof newProduct.mainCategory) => {
    updateField('mainCategory', value);
  };
  // SELECT multiple: otherCategory
  const handleOtherCategoryChange = (
    value: typeof newProduct.otherCategory
  ) => {
    updateField('otherCategory', value);
  };
  // SELECT simple: status
  const handleStatusChange = (value: typeof newProduct.status) => {
    updateField('status', value);
  };
  // INPUTS numéricos / string
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'stock') {
      updateField(name, Number(value));
    } else {
      updateField(name as keyof NewProduct, value);
    }
  };

  return (
    <Box className='input-container' component='div'>
      <SimpleSelect
        label='Main Category'
        name='mainCategory'
        value={newProduct.mainCategory}
        options={categoriesOptions}
        onChange={handleMainCategoryChange}
      />

      <MultipleSelect
        label='Other Categories'
        name='otherCategories'
        value={newProduct.otherCategory}
        options={categoriesOptions}
        onChange={handleOtherCategoryChange}
      />

      <SimpleSelect
        label='Status'
        name='status'
        value={newProduct.status}
        options={statusOptions}
        onChange={handleStatusChange}
      />

      {/* slug, longDescription, brand, stock */}
      <Box className='input-container' component='div' onChange={handleChange}>
        <Input name='slug' placeholder='Slug' value={newProduct.slug || ''} />
        <Input
          name='longDescription'
          placeholder='Long Description'
          value={newProduct.longDescription || ''}
        />
        <Input
          name='brand'
          placeholder='Brand'
          value={newProduct.brand || ''}
        />
        <Input
          name='stock'
          placeholder='Stock'
          value={newProduct.stock || ''}
        />
      </Box>
    </Box>
  );
};

export default OptionalFields;
