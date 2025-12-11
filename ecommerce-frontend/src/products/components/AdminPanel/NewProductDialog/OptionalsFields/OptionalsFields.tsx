import {
  Box,
  Chip,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import type {
  NewProduct,
  ProductCategory,
  ProductStatus,
} from '../../../../productTypes';
import SimpleSelect from '../../../UI/Inputs/SimpleSelect';

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

interface OptionalFieldsProps {
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

const OptionalFields = ({ newProduct, setNewProduct }: OptionalFieldsProps) => {
  // SELECT multiple: otherCategory
  const handleOtheCategoryChange = (
    event: SelectChangeEvent<typeof newProduct.otherCategory>
  ) => {
    const { value } = event.target;
    setNewProduct(prev => ({
      ...prev,
      otherCategory: typeof value === 'string' ? value.split(',') : value,
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
      {/* otherCategory (array) */}
      <SimpleSelect
        label='Main Category'
        name='mainCategory'
        value={newProduct.mainCategory}
        options={categoriesOptions}
        onChange={handleMainCategoryChange}
      />
      <FormControl>
        <InputLabel id='categoriesLabelId'>Categories</InputLabel>
        <Select
          labelId='categoriesLabelId'
          id='categoriesSelect'
          name='otherCategory'
          multiple
          value={newProduct.otherCategory ?? []}
          onChange={handleOtheCategoryChange}
          input={<OutlinedInput id='categoryLabel' label='Categories' />}
          renderValue={selected => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map(value => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {categories.map(category => (
            <MenuItem key={category.name} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <SimpleSelect
        label='Status'
        name='status'
        value={newProduct.status}
        options={statusOptions}
        onChange={handleStatusChange}
      />
      {/* status (ProductStatus | undefined) */}
      {/* <FormControl>
        <InputLabel id='statusLabelId'>Status</InputLabel>
        <Select
          labelId='statusLabelId'
          id='statusSelet'
          name='status'
          value={newProduct.status ?? ''}
          input={<OutlinedInput id='categoryLabel' label='Status' />}
          onChange={handleStatusChange}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {productStatus.map(status => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      {/* slug, longDescription, brand, stock */}
      <Box sx={styleForm} component='div' onChange={handleChange}>
        <Input
          name='slug'
          placeholder='Slug'
          required
          value={newProduct.slug || ''}
        />
        <Input
          name='longDesciption'
          placeholder='Long Description'
          required
          value={newProduct.longDescription || ''}
        />
        <Input
          name='brand'
          placeholder='Brand'
          required
          value={newProduct.brand || ''}
        />
        <Input
          name='stock'
          placeholder='Stock'
          required
          value={newProduct.stock || ''}
        />
      </Box>
    </Box>
  );
};

export default OptionalFields;
