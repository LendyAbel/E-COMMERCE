import {
  Box,
  Input,
 
} from '@mui/material';
import type {
  ProductCategory,
  ProductStatus,
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
const categoriesOptions = categories.map(cat => cat.name);
const statusOptions: ProductStatus[] = [
  'discontinued',
  'draft',
  'hidden',
  'published',
];


const styleForm = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  marginTop: 2,
  marginButtom: 2,
};

const OptionalFields = () => {
  const context = useContext(NewProductContext);
  if (!context) {
    throw new Error(
      'OptionalFields must be used within NewProductContext.Provider'
    );
  }
  const {newProduct, setNewProduct} = context
  // SELECT multiple: otherCategory
  const handleOtherCategoryChange = (
    value: typeof newProduct.otherCategory
  ) => {
    setNewProduct(prev => ({
      ...prev,
      otherCategory: value,
    }));
  };
  // SELECT simple: status
  const handleStatusChange = (value: typeof newProduct.status) => {
    setNewProduct(prev => ({
      ...prev,
      status: value,
    }));
  };
  // SELECT simple: mainCategory
  const handleMainCategoryChange = (value: typeof newProduct.mainCategory) => {
    setNewProduct(prev => ({
      ...prev,
      mainCategory: value,
    }));
  };
  // INPUTS numéricos / string
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'slug':
      case 'longDescription':
      case 'brand':
        setNewProduct(prev => ({
          ...prev,
          [name]: value === '' ? undefined : value,
        }));
        break;

      case 'stock':
        setNewProduct(prev => ({
          ...prev,
          stock: value === '' ? undefined : Number(value),
        }));
        break;
      default:
        setNewProduct(prev => ({
          ...prev,
          [name]: value,
        }));
    }
  };

  return (
    <Box sx={styleForm} component='div'>

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
      <Box sx={styleForm} component='div' onChange={handleChange}>
        <Input
          name='slug'
          placeholder='Slug'
          value={newProduct.slug || ''}
        />
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
