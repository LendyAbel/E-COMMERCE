import { Box, Input } from '@mui/material';
import {
  PRODUCT_STATUS,
  type NewProduct,
  type ProductStatus,
} from '../../../productTypes';

import SimpleSelect from '../../UI/Inputs/SimpleSelect';
import MultipleSelect from '../../UI/Inputs/MultipleSelect';

import { useQuery } from '@tanstack/react-query';
import { fetchAllCategories } from '../../../services/categoryServices';
import { useNewProductContext } from '../../../hooks/useNewProduct';

const OptionalFields = () => {
  const statusOptions: ProductStatus[] = [...PRODUCT_STATUS];

  const { newProduct, updateField } = useNewProductContext();

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchAllCategories,
    retry: 3,
  });
  const categories = data ?? [];

  const categoriesOptions = categories.map(cat => cat.slug);

  // SELECT simple: mainCategory
  const handleMainCategoryChange = (value: string | undefined) => {
    updateField('mainCategory' as keyof NewProduct, value);
  };
  // SELECT multiple: otherCategory
  const handleOtherCategoryChange = (value: string[] | undefined) => {
    updateField('otherCategory' as keyof NewProduct, value);
  };
  // SELECT simple: status
  const handleStatusChange = (value: ProductStatus | undefined) => {
    updateField('status' as keyof NewProduct, value);
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
